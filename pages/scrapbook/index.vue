<template>
  <div id="__scrapbook" class="d-flex flex-column flex-auto">
    <div class="page-heading">
      <h1 v-if="page.title" class="text-center">{{ page.title }}</h1>
      <span v-if="page.subtitle" class="text-hr">{{ page.subtitle }}</span>
    </div>
    <div class="page-content page-content--transparent flex-auto pt-3">
      <div class="container-fluid">
        <div class="d-flex align-items-center justify-content-center">
          <Breadcrumb></Breadcrumb>
        </div>
        <div class="masonry-grid d-flex flex-wrap mb-4">
          <div v-for="entry in entries" :key="entry.slug" class="masonry-grid__item p-5">
            {{ entry.title }}
          </div>
        </div>
      </div>

      <div class="w-100">
        <Pagination :meta="meta"></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ route, $axios }) {
    const limit = 1
    const currentPage = Number(route.query.page ? route.query.page : 1)
    const scrapbook = await $axios.$get(`https://admin.ika.ink/items/scrapbook`)
    const scrapbookPages = await $axios.$get(`https://admin.ika.ink/items/scrapbook_pages?fields=slug,title,headline,image.*&sort[]=-date_published&limit=${limit}&page=${currentPage}&meta=*`)
    const lastPage = Math.ceil(Number(scrapbookPages.meta.filter_count / limit))

    const meta = {
      lastPage,
      currentPage,
      prevPage: (currentPage > 1 ? currentPage - 1 : null),
      nextPage: (currentPage < lastPage ? currentPage + 1 : null),
      totalCount: scrapbookPages.meta.filter_count
    }
    
    return {
      page: scrapbook.data,
      entries: scrapbookPages.data,
      meta
    }
  },

  data() {
    return {
      pagination: {},
      isLoading: true,
      loaded: false
    };
  },

  head() {
    return {
      title: this.page.meta_title,
      meta: [
        { hid: 'description', name: 'description', content: this.page.meta_description },
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        {
          hid: 'masonry-script1',
          src: 'https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js',
          defer: true
        },
        {
          hid: 'masonry-script2',
          innerHTML: `
            window.addEventListener('load', (event) => {
              var grid = document.querySelector('.masonry-grid');
              var msnry = new Masonry( grid, {
                  itemSelector: '.masonry-grid__item',
                  columnWidth: 350
              });
              var msnry = new Masonry('.masonry-grid');
            });
          `,
          type: 'text/javascript',
          charset: 'utf-8'
        }
      ]
    }
  },

  watchQuery: ['page'],
}
</script>

<style lang="scss" scoped>
.container-fluid {
  max-width: 1400px;
}
</style>
