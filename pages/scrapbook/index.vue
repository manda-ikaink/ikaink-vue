<template>
  <div id="__scrapbook" class="d-flex flex-column flex-auto">
    <PageHeading :title="page.title" :subtitle="page.subtitle">
      <div class="container-fluid d-flex flex-column align-items-center justify-content-center">
        <Breadcrumb></Breadcrumb>
      </div>

      <div class="container-fluid d-flex justify-content-center">
        <div class="dropdown">
          <button id="tag-filter-toggle" class="filter-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
            Filters
          </button>
          <div class="dropdown-menu" aria-labelledby="tag-filter-toggle">
            <span class="dropdown-header text-display--xxs">Tag Filters</span>
            <ul class="scrapbook-filter">
              <li v-for="tag in tags" :key="`tag-${tag.slug}`" class="scrapbook-filter__item dropdown-item">
                <div class="form-check">
                  <input :id="`${tag.slug}-tag-filter`" v-model="checkedTags" class="form-check-input" type="checkbox" :value="tag.slug" @change="tagChange()">
                  <label :for="`${tag.slug}-tag-filter`" class="form-check-label">{{ tag.name }}</label>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </PageHeading>

    <div class="page-content page-content--transparent d-flex flex-column flex-auto pt-3">
      <div class="container-fluid d-flex flex-column align-items-center justify-content-center">
        <Breadcrumb></Breadcrumb>
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
          <ScrapbookCard :title="entry.title" :headline="entry.headline" :url="entry.slug" :image="entry.image" :ratio="entry.aspect_ratio" :tags="entry.scrapbook_tags"></ScrapbookCard>
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
    const limit = 4
    const query = route.query
    const currentPage = Number(query.page ? query.page : 1)

    // Tag & filtering
    const tags = await $axios.$get(`https://admin.ika.ink/items/scrapbook_tags?fields=name,slug,pages.scrapbook_pages_id`)
    const queryTags = query.tags ? query.tags.split(',') : []
    const selectedTags = queryTags.length ? getSelectedTags(tags, queryTags) : []
    const tagIds = selectedTags.length ? getPageIds(selectedTags) : []
    const checkedTags = formatSelected(selectedTags)

    let tagQuery = ''
    if (queryTags.length) tagQuery = tagIds.length ? `&filter[id][_in]=${tagIds}` : '&filter[id][_in]=0'

    // Data
    const scrapbook = await $axios.$get(`https://admin.ika.ink/items/scrapbook`)
    const scrapbookPages = await $axios.$get(`https://admin.ika.ink/items/scrapbook_pages?fields=slug,title,headline,aspect_ratio,scrapbook_tags.scrapbook_tags_slug.name,scrapbook_tags.scrapbook_tags_slug.slug,image.*${tagQuery}&sort[]=-date_published&limit=${limit}&page=${currentPage}&meta=*`)

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
      // selectedTags,
      checkedTags
    }

    function getSelectedTags($tags, $queryTags) {
      const $selected = []

      Object.entries($tags.data).forEach(([key, value], index) => {
        if ($queryTags.includes(value.slug)) {
          $selected.push({name: value.name, slug: value.slug, pages: value.pages})
        }
      })

      return $selected
    }

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

    function formatSelected($selectedTags) {
      const $selected = []

      Object.entries($selectedTags).forEach(([key, value], index) => {
        $selected.push(value.slug)
      })

      return $selected
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

.filter-btn {}

.scrapbook-filter {
  &__item {
    line-height: 1;
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
