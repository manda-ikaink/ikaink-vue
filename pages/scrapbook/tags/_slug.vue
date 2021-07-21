<template>
  <div id="__scrapbook-tags" class="d-flex flex-column flex-auto">
    <PageHeading :title="`${page.title}: ${tag.name}`" :subtitle="page.subtitle"></PageHeading>

    <div class="page-content page-content--transparent d-flex flex-column flex-auto pt-3">
      <div class="container-fluid d-flex flex-column align-items-center justify-content-center mb-4">
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

      <div v-else class="scrapbook-container text-center">
        <p>No entires under "{{ tag.name }}". Please check back later.</p>
      </div>

      <div v-if="entries.length" class="mt-auto w-100">
        <Pagination :meta="meta"></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Masonry from 'masonry-layout'

export default {
  async asyncData ({ params, route, $axios }) {
    const limit = 4
    const query = route.query
    const currentPage = Number(query.page ? query.page : 1)
    const scrapbook = await $axios.$get(`https://admin.ika.ink/items/scrapbook`)
    const tag = await $axios.$get(`https://admin.ika.ink/items/scrapbook_tags?filter[slug][_eq]=${params.slug}&fields=slug,name,pages.scrapbook_pages_id,meta_title,meta_descrption`)
    const pageIds = tag.data[0].pages
    const idArray = []
    
    if (pageIds.length) {
      // eslint-disable-next-line no-unused-vars
      for (const [key, value] of Object.entries(pageIds)) {
        idArray.push(value.scrapbook_pages_id)
      }
    } else {
      idArray.push(0)
    }

    const entries = await $axios.$get(`https://admin.ika.ink/items/scrapbook_pages?filter[id][_in]=${idArray}&fields=slug,title,headline,aspect_ratio,scrapbook_tags.scrapbook_tags_slug.name,scrapbook_tags.scrapbook_tags_slug.slug,image.*&sort[]=-date_published&limit=${limit}&page=${currentPage}&meta=*`)
    const lastPage = entries.data.length ? Math.ceil(Number(entries.meta.filter_count / limit)) : 1
    const meta = {
      lastPage,
      currentPage,
      prevPage: (currentPage > 1 ? currentPage - 1 : null),
      nextPage: (currentPage < lastPage ? currentPage + 1 : null),
      totalCount: entries.data.length ? entries.meta.filter_count : 0,
    }

    return {
      slug: params.slug,
      page: scrapbook.data,
      tag: tag.data[0],
      entries: entries.data,
      meta
    }
  },

  data() {
    return {
      loading: true
    }
  },

  head() {
    return {
      title: this.tag.meta_title,
      meta: [
        { hid: 'description', name: 'description', content: this.tag.meta_description },
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
    }
  }
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
    padding: 0 7px;
  }

  &.loading {
    opacity: 0;
    transition: opacity 0s ease-in;
  }
}
</style>