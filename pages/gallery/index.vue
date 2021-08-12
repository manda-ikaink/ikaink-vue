<template>
  <div id="__gallery" class="d-flex flex-column flex-auto">
    <SocialHead
      :title="page.og_title || page.title"
      :description="page.og_description || page.meta_description"
      :image="page.og_image ? `${$config.apiRoute}/assets/${page.og_image}` : null"
    />

    <PageHeading :title="page.title" :subtitle="page.subtitle">
      <div class="d-flex align-items-center justify-content-center">
        <Breadcrumb></Breadcrumb>
      </div>
    </PageHeading>

    <div class="page-content pt-lg-5 flex-auto">
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div v-for="category in categories" :key="category.id" class="col-sm-6 col-lg-4 px-3 mb-4">
            <GalleryCard 
              :name="category.name" 
              :slug="category.slug"
              :image="category.image">
            </GalleryCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'base',
  
  async asyncData ({ $axios, $config }) {
    const gallery = await $axios.$get(`${$config.apiRoute}/items/gallery`)
    const categories = await $axios.$get(`${$config.apiRoute}/items/gallery_categories?fields=slug,name,subtitle,image.*&sort=sort`)

    return {
      page: gallery.data,
      categories: categories.data,
    }
  },

  head() {
    return {
      title: this.page.meta_title ? this.page.meta_title : `${this.page.title} - ${this.$config.websiteTitle}`,
      meta: [
        { hid: 'description', name: 'description', content: this.page.meta_description },
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
.container-fluid {
  max-width: 1400px;
}
</style>
