<template>
  <div id="__scrapbook" class="d-flex flex-column flex-auto">
    <SocialHead
      :title="page.og_title || page.title"
      :description="page.og_description || page.meta_description"
      :image="page.og_image ? `${$config.apiRoute}/assets/${page.og_image}` : null"
    />
    
    <PageHeading :title="page.title" :subtitle="page.subtitle">
      <div class="container-fluid d-flex flex-column align-items-center justify-content-center">
        <Breadcrumb></Breadcrumb>
      </div>
    </PageHeading>

    <ScrapbookFilters :tags="tags"></ScrapbookFilters>

    <div class="page-content page-content--transparent d-flex flex-column flex-auto pt-lg-5">
      <div id="scrapbook-meta" class="scrapbook-container scrapbook-container--meta d-flex align-items-center justify-content-between mb-3">
        <div class="d-flex justify-content-between flex-auto">
          Page {{ meta.currentPage }} of {{ meta.lastPage }}<span class="visually-hidden">, </span> 
        </div>
        <div>
          {{ meta.totalCount }} total entries
        </div>
      </div>
      
      <section v-if="entries.length" class="scrapbook-container mb-4" :class="loading ? 'loading' : null">
        <h2 class="visually-hidden">Articles</h2>

        <div class="masonry-grid position-relative d-flex flex-wrap" :class="loading ? 'loading' : null" aria-describedby="scrapbook-meta">
          <div v-for="entry in entries" :key="entry.slug" class="masonry-grid__item pb-2">
            <ScrapbookCard :title="entry.title" :headline="entry.headline" :slug="entry.slug" :image="entry.image" :ratio="entry.aspect_ratio" :tags="entry.scrapbook_tags"></ScrapbookCard>
          </div>
        </div>
      </section>

      <div v-else class="scrapbook-container mb-4">
        <p class="text-center">No entires to show. Please check back later.</p>
        <div class="masonry-grid"></div>
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
  scrollToTop: false,

  async asyncData ({ route, $axios, $config }) {
    const limit = 50
    const query = route.query
    const currentPage = Number(query.page ? query.page : 1)

    // Tag & filtering
    const tags = await $axios.$get(`${$config.apiRoute}/items/scrapbook_tags?fields=name,slug,pages.scrapbook_pages_id`)
    const checkedTags = query.tags ? query.tags.split(',') : []
    const pageIds = checkedTags.length ? getSelectedTags(tags, checkedTags) : []

    let filterQuery = ''
    if (checkedTags.length) filterQuery = pageIds.length ? `&filter[id][_in]=${pageIds}` : '&filter[id][_in]=0'

    // Data
    const scrapbook = await $axios.$get(`${$config.apiRoute}/items/scrapbook`)
    const scrapbookPages = await $axios.$get(`${$config.apiRoute}/items/scrapbook_pages?fields=slug,title,headline,aspect_ratio,scrapbook_tags.scrapbook_tags_slug.name,scrapbook_tags.scrapbook_tags_slug.slug,image.*${filterQuery}&sort[]=-date_published&limit=${limit}&page=${currentPage}&meta=*`)

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
      title: this.page.meta_title ? this.page.meta_title : `${this.page.title} - ${this.$config.websiteTitle}`,
      meta: [
        { hid: 'description', name: 'description', content: this.page.meta_description },
      ],
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
      }, 700);
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

.scrapbook-container {
  position: relative;
  margin: 0 auto;
  width: 350px;
  max-width: 100%;

  @include media-breakpoint-up(md) { width: 700px; }

  @include media-breakpoint-up(xl) { width: 1050px; }

  @include media-breakpoint-up(xxl) { width: 1400px; }

  &.loading {
    min-height: 100vh;
    background: no-repeat url('~assets/images/loading.svg') top center;
  }

  &--meta {
    padding-left: 7px;
    padding-right: 7px;
    font-size: 14px;
  }
}

.masonry-grid {
  transition: opacity 0.3s ease-in;

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
