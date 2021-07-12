<template>
  <div id="__gallery">
    <div class="page-heading">
      <h1 v-if="gallery.title" class="text-center">{{ gallery.title }}</h1>
      <span v-if="gallery.subtitle" class="text-hr">{{ gallery.subtitle }}</span>
      <div class="d-flex align-items-center justify-content-center">
        <Breadcrumb></Breadcrumb>
      </div>
    </div>
    <div class="page-content pt-5">
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div v-for="category in categories" :key="category.id" class="col-sm-6 col-lg-4 px-3 mb-4">
            <GalleryCard 
              :name="category.name" 
              :url="`/gallery/${category.slug}`"
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
      gallery: gallery.data,
      page: gallery,
      categories: categories.data,
    }
  },

  head() {
    return {
      title: this.gallery.meta_title,
      meta: [
        { hid: 'description', name: 'description', content: this.gallery.meta_description },
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
