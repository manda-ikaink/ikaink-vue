<template>
  <div id="__scrapbook" class="d-flex flex-column flex-auto">
    <PageHeading :title="page.title" :subtitle="page.subtitle">
      <div class="container-fluid d-flex flex-column align-items-center justify-content-center">
        <Breadcrumb></Breadcrumb>
      </div>

      <div class="container-fluid d-flex justify-content-center flex-wrap">
        <button id="tag-filter-toggle" class="filter-btn dropdown-toggle bg--blue-indigo mb-3" type="button" data-bs-toggle="collapse" data-bs-target="#tag-filters" aria-expanded="false" aria-controls="tag-filters">
          Filter Posts
        </button>
        <button v-if="checkedTags.length" id="tag-filter-toggle" class="filter-btn bg--blue-indigo mb-3 ms-2" type="button" @click="clear()">
          Clear All
        </button>
      </div>
      <div id="tag-filters" class="collapse bg--green-teal w-100" aria-labelledby="tag-filter-toggle">
        <div class="container py-3">
          <span class="filter-text">Filter by tag:</span>

          <ul class="filter-list list-unstyled row px-0 m-0">
            <li v-for="tag in tags" :key="`tag-${tag.slug}`" class="filter-list__item col-6 col-md-4">
              <div class="form-check">
                <label :for="`${tag.slug}-tag-filter`" class="form-check-label d-flex align-items-center"><input :id="`${tag.slug}-tag-filter`" v-model="checkedTags" class="form-check-input me-2" name="tag" type="checkbox" :value="tag.slug" @change="tagChange()"><span class="d-inline-block mt-2">{{ tag.name }}</span></label>
              </div>
            </li>
          </ul>

          <div class="text-end">
            <a v-if="checkedTags.length" class="filter-text" href="#" @click.prevent="clear()">Clear All</a>
          </div>
        </div>
      </div>
    </PageHeading>

    <div class="page-content page-content--transparent d-flex flex-column flex-auto pt-3">
      <div v-if="checkedTags.length" id="scrapbook-selected" class="scrapbook-selected container-fluid d-flex flex-wrap align-items-center mb-4">
        <div class="filter-text me-2">
          Selected filters:
        </div>
        <template v-for="tag in tags">
          <div v-if="checkedTags.includes(tag.slug)" :key="`tag-selected-${tag.slug}`" class="filter-item form-check me-2">
            <input :id="`${tag.slug}-tag-selected`" v-model="checkedTags" class="form-check-input" name="selected-tag" type="checkbox" :value="tag.slug" @change="tagChange()">
            <label :for="`${tag.slug}-tag-selected`" class="form-check-label bg--pink-orange mb-0">{{ tag.name }} <IconClose :width="10" :height="10"></IconClose></label>
          </div>
        </template>
      </div>

      <div id="scrapbook-meta" class="scrapbook-container scrapbook-container--meta d-flex align-items-center justify-content-between mb-3">
        <div class="d-flex justify-content-between flex-auto">
          Page {{ meta.currentPage }} of {{ meta.lastPage }}<span class="visually-hidden">, </span> 
        </div>
        <div>
          {{ meta.totalCount }} total entries
        </div>
      </div>
      
      <div v-if="entries.length" class="scrapbook-container masonry-grid d-flex flex-wrap mb-4" :class="loading ? 'loading' : null" aria-describedby="scrapbook-meta">
        <div v-for="entry in entries" :key="entry.slug" class="masonry-grid__item pb-2">
          <ScrapbookCard :title="entry.title" :headline="entry.headline" :slug="entry.slug" :image="entry.image" :ratio="entry.aspect_ratio" :tags="entry.scrapbook_tags"></ScrapbookCard>
        </div>
      </div>

      <div v-else class="scrapbook-container masonry-grid mb-4">
        <p class="text-center">No entires to show. Please check back later.</p>
      </div>

      <div v-if="meta.lastPage > 1" class="mt-auto w-100">
        <Pagination :meta="meta"></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Masonry from 'masonry-layout'

export default {
  async asyncData ({ route, $axios }) {
    const limit = 50
    const query = route.query
    const currentPage = Number(query.page ? query.page : 1)

    // Tag & filtering
    const tags = await $axios.$get(`https://admin.ika.ink/items/scrapbook_tags?fields=name,slug,pages.scrapbook_pages_id`)
    const checkedTags = query.tags ? query.tags.split(',') : []
    const pageIds = checkedTags.length ? getSelectedTags(tags, checkedTags) : []

    let filterQuery = ''
    if (checkedTags.length) filterQuery = pageIds.length ? `&filter[id][_in]=${pageIds}` : '&filter[id][_in]=0'

    // Data
    const scrapbook = await $axios.$get(`https://admin.ika.ink/items/scrapbook`)
    const scrapbookPages = await $axios.$get(`https://admin.ika.ink/items/scrapbook_pages?fields=slug,title,headline,aspect_ratio,scrapbook_tags.scrapbook_tags_slug.name,scrapbook_tags.scrapbook_tags_slug.slug,image.*${filterQuery}&sort[]=-date_published&limit=${limit}&page=${currentPage}&meta=*`)

    // Meta & Pagination
    const lastPage = (Math.ceil(Number(scrapbookPages.meta.filter_count / limit)) > 1) ? Math.ceil(Number(scrapbookPages.meta.filter_count / limit)) : 1
    const meta = {
      currentPage,
      lastPage,
      prevPage: ((currentPage > 1) ? currentPage - 1 : null),
      nextPage: ((currentPage < lastPage) ? currentPage + 1 : null),
      totalCount: scrapbookPages.meta.filter_count,
    }
    
    return {
      page: scrapbook.data,
      entries: scrapbookPages.data,
      meta,
      tags: tags.data,
      checkedTags
    }
    
    // Pickout data out of full tags list based on if the tag is currently being filtered
    // Specifically getting associated page IDs per selected tag
    function getSelectedTags($tags, $queryTags) {
      const $selected = []

      Object.entries($tags.data).forEach(([key, value], index) => {
        if ($queryTags.includes(value.slug)) {
          $selected.push({pages: value.pages})
        }
      })

      return $selected.length ? getPageIds($selected) : []
    }

    // Pick out page IDs from data and merge into one array w/o duplicates
    function getPageIds($tags) {
      const $ids = []

      Object.entries($tags).forEach(([key, value], index) => {
        if (value.pages.length) {
          Object.entries(value.pages).forEach(([key, value], index) => {
            if (!$ids.includes(value.scrapbook_pages_id)) {
              $ids.push(value.scrapbook_pages_id)
            }
          })
        }
      })
      
      return $ids
    }
  },

  data() {
    return {
      loading: true
    }
  },

  head() {
    return {
      title: this.page.meta_title,
      meta: [
        { hid: 'description', name: 'description', content: this.page.meta_description },
      ]
    }
  },

  watch: {
    entries() {
      this.layout()
    }
  },

  watchQuery: ['tags', 'page'],

  mounted() {
    this.layout()
  },

  methods: {
    masonry () {
      const grid = document.querySelector('.masonry-grid');
      // eslint-disable-next-line no-unused-vars
      const msnry = new Masonry( grid, {
        itemSelector: '.masonry-grid__item',
        columnWidth: 350,
        horizontalOrder: true
      });

      msnry.layout()
    },

    layout() {
      this.loading = true
      
      setTimeout(() => { 
        this.masonry() 
        this.loading = false
      }, 500);
    },

    tagChange() {
      this.$router.replace({ query: { tags: this.checkedTags.length ? this.checkedTags.toString() : undefined }})
    },

    clear() {
      this.checkedTags = []
      this.$router.replace({ query: { tags: undefined }})
    }
  }
}
</script>

<style lang="scss" scoped>
.container-fluid {
  max-width: 1400px;
}

.container {
  max-width: 1200px;
}

.filter-btn {
  padding: 7px 10px;
  border: 0;
  border-radius: 10px;
  color: white;
  line-height: 1;
  text-shadow: 0 0 2px $almost-black;
}

.filter-text {
  font-family: $headings-font-family;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0.15em;
  color: inherit;
  text-transform: uppercase;
}

.filter-list {
  &__item {
    font-size: 14px;
    font-weight: bold;
    line-height: 1;
  }
}

.filter-item {
  position: relative;
  padding: 0;
  border: 0;
  border-radius: 10px;

  label {
    display: inline-block;
    padding: 7px 10px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 10px;
    line-height: 1;
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    font-size: 0;
    border: 0;
    opacity: 0;
  }
}

.scrapbook-container {
  position: relative;
  margin: 0 auto;
  width: 350px;
  max-width: 100%;

  @include media-breakpoint-up(md) { width: 700px; }

  @include media-breakpoint-up(xl) { width: 1050px; }

  @include media-breakpoint-up(xxl) { width: 1400px; }

  &--meta {
    padding-left: 7px;
    padding-right: 7px;
    font-size: 14px;
  }
}

.masonry-grid {
  transition: opacity 0.8s ease-in;

  &__item {
    width: 350px;
    max-width: 100%;
    padding: 0 7px;
  }

  &.loading {
    opacity: 0;
    transition: opacity 0s ease-in;
  }
}
</style>
