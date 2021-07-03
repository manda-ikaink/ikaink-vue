/* eslint-disable vue/no-v-html */
<template>
  <!-- eslint-disable vue/no-v-html -->
  <div v-html="page.content"></div>
  <!--eslint-enable-->
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
        { hid: 'description', name: 'description', content: this.page.meta_description },
      ],
    }
  }
}
</script>
