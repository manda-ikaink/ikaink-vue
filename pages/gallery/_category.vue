<template>
  <div id="__gallery-category">
    <PageHeading :title="page.name" :subtitle="page.subtitle">
      <div class="d-flex align-items-center justify-content-center">
        <Breadcrumb></Breadcrumb>
      </div>
    </PageHeading>

    <div id="gallery-list" class="page-content pt-lg-5" tabindex="-1">
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div v-for="entry in entries" :key="entry.id" class="col-6 col-sm-4 col-lg-3 px-3 mb-4">
            <GalleryEntry 
              :id="entry.gallery_entries_id.id"
              :name="entry.gallery_entries_id.name" 
              :image="entry.gallery_entries_id.image"
              :images="entry.gallery_entries_id.images"
              :slug="entry.gallery_entries_id.slug"
              :url="`/gallery/${slug}/${entry.gallery_entries_id.slug}`"
              @show-gallery="showGallery">
            </GalleryEntry>
          </div>
        </div>
      </div>
    </div>

    <transition name="fadeup">
      <NuxtChild v-if="modalActive" :active="modalActive" :focus-element="focusElement" @close-gallery="hideGallery"></NuxtChild>
    </transition>
  </div>
</template>

<script>
export default {
  layout: 'base',
  
  async asyncData ({ params, $axios, error }) {
    return await $axios.$get(`https://admin.ika.ink/items/gallery_categories?filter[slug][_eq]=${params.category}&fields=*.*,entries.*.*.*`)
    .then(response => {
      if (response.data.length === 0) error({ statusCode: 404, message: 'Page not found' })
      
      return { 
        slug: params.category,
        page: response.data[0],
        entries: response.data[0] ? response.data[0].entries : null
      }
    }).catch(e => {
      error(e)
    })
  },

  data () {
    return {
      modalActive: false
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

  computed: {
    focusElement() {
      return this.$store.state.gallery.active ? this.$store.state.gallery.active : 'gallery-list'
    }
  },

  watch: {
    $route() {
      if (!this.$route.params.entry) {
        this.hideGallery()
      } else {
        this.showGallery()
      }
    },
  },

  mounted() {
    if (this.$route.params.entry) this.showGallery()
  },

  methods: {
    showGallery() {
      this.modalActive = true
    },

    hideGallery() {
      this.modalActive = false
    }
  }
}
</script>

<style lang="scss" scoped>
.container-fluid {
  max-width: 1200px;
}
</style>