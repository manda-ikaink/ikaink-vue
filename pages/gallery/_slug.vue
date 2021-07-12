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
              :image="entry.gallery_entries_id.image">
            </GalleryEntry>
          </div>
        </div>
      </div>
    </div>
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

    head() {
      return {
        title: this.page.meta_title,
        meta: [
          { hid: 'description', name: 'description', content: this.page.meta_description },
        ],
      }
    }
  }
</script>

<style lang="scss" scoped>
.container-fluid {
  max-width: 1200px;
}
</style>