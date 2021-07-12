<template>
  <div id="__gallery-category">
    <div class="page-heading">
      <h1 v-if="page.name" class="text-center">{{ page.name }}</h1>
      <span v-if="page.subtitle" class="text-hr">{{ page.subtitle }}</span>
      <div class="d-flex align-items-center justify-content-center">
        <Breadcrumb></Breadcrumb>
      </div>
    </div>
    <div class="page-content pt-5">
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
    <transition name="fade">
      <GalleryPopup v-if="activeEntry" :entry="activeEntry" @close-gallery="hideGallery"></GalleryPopup>
    </transition>
  </div>
</template>

<script>
export default {
  async asyncData ({ params, $axios }) {
    const page = await $axios.$get(`https://admin.ika.ink/items/gallery_categories?filter[slug][_eq]=${params.slug}&fields=*.*,entries.*.*.*`)

    return {
      slug: params.slug,
      page: page.data[0],
      entries: page.data[0].entries
    }
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
      const item = await this.$axios.$get(`https://admin.ika.ink/items/gallery_entries/${id}?fields=name,image.*,year,tools,link,description`)
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>