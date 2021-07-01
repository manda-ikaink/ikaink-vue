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
  }
}
</script>
