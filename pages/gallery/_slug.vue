<template>
  <h1>{{ page.name }}</h1>
</template>

<script>
  export default {
    async asyncData ({ params, $axios }) {
      const page = await $axios.$get(`https://admin.ika.ink/items/gallery_categories?filter[slug][_eq]=${params.slug}&fields=slug,name,meta_title,meta_description,entries.*`)

      return {
        slug: params.slug,
        page: page.data[0]
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