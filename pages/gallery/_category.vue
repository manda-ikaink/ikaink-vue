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
      <NuxtChild v-if="activeEntry" :entry="activeEntry" @close-gallery="hideGallery"></NuxtChild>
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
      activeEntry: null,
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
    showModal() {
      return this.$route.matched.length;
    }
  },

  watch: {
    $route() {
      if (!this.$route.params.entry) {
        this.hideGallery()
      } else {
        this.showGallery(this.$route.params.entry)
      }
    },
  },

  mounted() {
    if (this.$route.params.entry) this.showGallery(this.$route.params.entry)
  },

  methods: {
    async showGallery(slug) {
      const item = await this.$axios.$get(`https://admin.ika.ink/items/gallery_entries?filter[slug][_eq]=${slug}&fields=name,image.*,images.directus_files_id.*,year,tools,size,link,description`)
      this.activeEntry = item.data ? item.data[0] : null
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '0px'
    },

    hideGallery() {
      this.activeEntry = null
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
      this.$router.push({ params: { entry: undefined } })
    }
  }
}
</script>

<style lang="scss" scoped>
.container-fluid {
  max-width: 1200px;
}
</style>