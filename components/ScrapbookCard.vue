<template>
  <div class="scrapbook-card" :aria-label="name">
    <div class="scrapbook-card__placeholder"></div>
    <picture v-if="image">
      <source :data-srcset="`${imagePath}?fit=cover&width=335&height=335`" media="(max-width: 356px)" />
      <source :data-srcset="`${imagePath}?fit=cover&width=435&height=435`" media="(min-width: 357px) and (max-width: 575px)" />
      <source :data-srcset="`${imagePath}?fit=cover&width=370&height=370`" media="(min-width: 576px) and (max-width: 767px)" />
      <source :data-srcset="`${imagePath}?fit=cover&width=435&height=435`" media="(min-width: 768px) and (max-width: 991px)" />
      <source :data-srcset="`${imagePath}?fit=cover&width=400&height=400`" media="(min-width: 1200px)" />
      <img class="scrapbook-card__img img-fluid w-100 blur-up lazyload" width="470" height="470" :src="`${imagePath}?fit=cover&width=100&height=100`" :data-src="`${imagePath}?fit=cover&width=470&height=470`" :title="(image.title ? image.title : null)" :alt="(image.description ? image.description : name)" />
    </picture>

    <div class="scrapbook-card__header d-flex align-items-center justify-content-center">
      <span class="scrapbook-card__title text-display--md mb-0">{{ title }}</span>
    </div>

    <NuxtLink :to="url" class="scrapbook-card block-link-full" :aria-label="title"></NuxtLink>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import getImagePath from '../mixins/getImagePath.js'

export default {
  mixins: [getImagePath],

  props: {
    title: {
      type: String,
      required: true
    },
    headline: {
      type: [String, null],
      required: true,
      default: null
    },
    url: {
      type: String,
      required: true
    },
    image: {
      type: Object,
      required: false,
      default: null
    },
  },

  computed: {
    // eslint-disable-next-line object-shorthand
    imagePath: function () {
      return this.getImagePath(this.image)
    }
  }
}
</script>

<style lang="scss" scoped>
.container-fluid {
  max-width: 1400px;
}
</style>