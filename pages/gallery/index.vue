<template>
  <div id="__gallery" class="d-flex flex-column flex-auto">
    <PageHeading :title="page.title" :subtitle="page.subtitle">
      <div class="d-flex align-items-center justify-content-center">
        <Breadcrumb></Breadcrumb>
      </div>
    </PageHeading>

    <div class="page-content flex-auto pt-5">
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
  async asyncData ({ params, $axios }) {
    const gallery = await $axios.$get(`https://admin.ika.ink/items/gallery`)
    const categories = await $axios.$get(`https://admin.ika.ink/items/gallery_categories?fields=slug,name,subtitle,image.*&sort=sort`)

    return {
      slug: params.slug,
      page: gallery.data,
      categories: categories.data,
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
  max-width: 1400px;
}
</style>
