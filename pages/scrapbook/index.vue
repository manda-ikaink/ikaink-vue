<template>
  <div id="__scrapbook" class="d-flex flex-column flex-auto">
    <div class="page-heading">
      <h1 v-if="page.title" class="text-center">{{ page.title }}</h1>
      <span v-if="page.subtitle" class="text-hr">{{ page.subtitle }}</span>
    </div>
    <div class="page-content page-content--transparent d-flex flex-column flex-auto pt-3">
      <div class="container-fluid d-flex align-items-center justify-content-center">
        <Breadcrumb></Breadcrumb>
      </div>

      <div id="scrapbook-meta" class="scrapbook-container scrapbook-container--meta d-flex justify-content-between">
        <span>Page {{ meta.currentPage }} of {{ meta.lastPage }}<span class="visually-hidden">,</span> </span>
        <span>{{ meta.totalCount }} total entries</span>
      </div>
      
      <div class="scrapbook-container masonry-grid d-flex flex-wrap mb-4" :class="loading ? 'loading' : null" aria-describedby="scrapbook-meta">
        <div v-for="entry in entries" :key="entry.slug" class="masonry-grid__item pb-2">
          <ScrapbookCard :title="entry.title" :headline="entry.headline" :url="entry.slug" :image="entry.image"></ScrapbookCard>
        </div>
      </div>

      <div class="mt-auto w-100">
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
    const entryTags = await $axios.$get(`https://admin.ika.ink/fields/scrapbook_pages/tags`)
    const scrapbook = await $axios.$get(`https://admin.ika.ink/items/scrapbook`)
    const scrapbookPages = await $axios.$get(`https://admin.ika.ink/items/scrapbook_pages?fields=slug,title,headline,image.*&sort[]=-date_published&limit=${limit}&page=${currentPage}&meta=*`)
    const lastPage = Math.ceil(Number(scrapbookPages.meta.filter_count / limit))
    const meta = {
      lastPage,
      currentPage,
      prevPage: (currentPage > 1 ? currentPage - 1 : null),
      nextPage: (currentPage < lastPage ? currentPage + 1 : null),
      totalCount: scrapbookPages.meta.filter_count,
      tags: entryTags.data.meta.options.choices
    }
    
    return {
      page: scrapbook.data,
      entries: scrapbookPages.data,
      meta
    }
  },

  data() {
    return {
      msnry: {},
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

  watchQuery: ['page'],

  mounted() {
    this.layout()
  },

  methods: {
    layoutMasonry () {
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
        this.layoutMasonry() 
        this.loading = false
      }, 500);
    }
  },
}
</script>

<style lang="scss" scoped>
.container-fluid {
  max-width: 1400px;
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
    padding: 7px;
  }

  &.loading {
    opacity: 0;
    transition: opacity 0s ease-in;
  }
}
</style>
