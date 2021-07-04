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
        <h1 class="hero-title text-center text-lg-start">
          <span class="visually-hidden">{{ $store.state.websiteTitle }}: </span>
          <div class="home-hero__hover">
            <div class="position-relative">
              <NuxtLink title="View Gallery of Art &amp; Illustrations " to="/gallery">Art, </NuxtLink>
            </div>
            <div class="position-relative">
              <NuxtLink title="View Scrapbook of Notes, Pictures &amp; Updates" to="/scrapbook">Notes, </NuxtLink>
            </div>
            <div class="position-relative">
              <NuxtLink title="View Development &amp; Coding Projects" to="/projects">Projects</NuxtLink>
            </div>
          </div>

          <span v-if="page.author" class="hero-subtitle d-block"> by </span>
          <span v-if="page.author" class="hero-subtitle d-block">Amanda Eldreth</span>
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { tooltip } from 'bootstrap'

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
