<template>
  <div>
    <div v-html="page.content"></div>
  </div>
</template>

<script>
export default {
  async asyncData ({ params, $axios }) {
    const page = await $axios.$get(`https://admin.ika.ink/items/homepage`)

    return {
      slug: params.slug,
      page: page.data
    }
  },

  head() {
    return {
      title: this.page.meta_title,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: this.page.meta_description },
      ],
    }
  }
}
</script>
