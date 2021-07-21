<template>
  <div id="__scrapbook-tags" class="d-flex flex-column flex-auto">
    <PageHeading :title="page.title" :subtitle="page.subtitle"></PageHeading>

    <div class="page-content page-content--transparent d-flex flex-column flex-auto pt-3">
      <div class="container-fluid d-flex flex-column align-items-center justify-content-center mb-4">
        <Breadcrumb></Breadcrumb>
      </div>
      
      <div class="container">
        <div class="row">
          <div v-for="entry in entries" :key="entry.slug" class="col-sm-6 col-md-4 text-center">
            <ScrapbookTag :slug="entry.slug">
              {{ entry.name }}
            </ScrapbookTag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ route, $axios }) {
    const scrapbook = await $axios.$get(`https://admin.ika.ink/items/scrapbook`)
    const scrapbookTags = await $axios.$get(`https://admin.ika.ink/items/scrapbook_tags?fields=slug,name&sort[]=slug`)
    
    return {
      page: scrapbook.data,
      entries: scrapbookTags.data,
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

  watchQuery: ['page'],
}
</script>

<style lang="scss" scoped>
.container-fluid {
  max-width: 1400px;
}

.container {
  max-width: 1200px;
}
</style>
