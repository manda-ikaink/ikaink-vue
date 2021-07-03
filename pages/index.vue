<template>
  <div class="home-hero d-flex align-items-center justify-content-center">
    <!-- Star Objects -->
    <div class="star-object">
      <div class="star-object__star"></div>
      <div class="star-object__star"></div>
      <div class="star-object__star"></div>
    </div>

    <div class="home-hero__container container d-flex align-items-center justify-content-center justify-content-lg-start">
      <div class="home-hero__content position-relative">
        <h2 class="hero-title text-center text-lg-start">
          <!-- eslint-disable vue/no-v-html -->
          <div v-if="page.content" class="home-hero__hover" v-html="page.content"></div>
          <!--eslint-enable-->

          <span v-if="page.author" class="hero-subtitle d-block"> by </span>
          <span v-if="page.author" class="hero-subtitle d-block">{{ page.author }}</span>
        </h2>
      </div>
    </div>
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
        { hid: 'description', name: 'description', content: this.page.meta_description },
      ],
    }
  }
}
</script>
