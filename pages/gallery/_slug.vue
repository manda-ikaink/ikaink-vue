<template>
  <div id="__gallery-category">
    <PageHeading :title="page.name" :subtitle="page.subtitle">
      <div class="d-flex align-items-center justify-content-center">
        <Breadcrumb></Breadcrumb>
      </div>
    </PageHeading>

    <div class="page-content pt-lg-5">
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div v-for="entry in entries" :key="entry.id" class="col-6 col-sm-4 col-lg-3 px-3 mb-4">
            <GalleryEntry 
              :id="entry.gallery_entries_id.id"
              :name="entry.gallery_entries_id.name" 
              :image="entry.gallery_entries_id.image"
              @show-gallery="showGallery">
            </GalleryEntry>
          </div>
        </div>
      </div>
    </div>
    <transition name="fadeup">
      <GalleryPopup v-if="activeEntry" :entry="activeEntry" @close-gallery="hideGallery"></GalleryPopup>
    </transition>
  </div>
</template>

<script>
export default {
  layout: 'base',
  
  async asyncData ({ params, $axios, error }) {
    return await $axios.$get(`https://admin.ika.ink/items/gallery_categories?filter[slug][_eq]=${params.slug}&fields=*.*,entries.*.*.*`)
    .then(response => {
      if (response.data.length === 0) error({ statusCode: 404, message: 'Page not found' })
      
      return { 
        slug: params.slug,
        page: response.data[0],
        entries: response.data[0] ? response.data[0].entries : null
      }
    }).catch(e => {
      error(e)
    })
  },

  data () {
    return {
      activeEntry: null
    }
  },

  head() {
    return {
      title: this.page.meta_title,
      meta: [
        { hid: 'description', name: 'description', content: this.page.meta_description },
      ],
    }
  },

  methods: {
    async showGallery(id) {
      const item = await this.$axios.$get(`https://admin.ika.ink/items/gallery_entries/${id}?fields=name,image.*,year,tools,size,link,description`)
      this.activeEntry = item.data
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '0px'
    },

    hideGallery() {
      this.activeEntry = null
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.container-fluid {
  max-width: 1200px;
}
</style>