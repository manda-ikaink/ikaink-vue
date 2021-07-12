<template>
  <div class="gallery-entry" :aria-label="name">
    <div class="gallery-entry__image mb-3">
      <img v-if="image" class="gallery-entry__img img-fluid w-100 blur-up lazyload" width="300" height="300" :src="`${imagePath}?fit=cover&width=100&height=100`" :data-src="`${imagePath}?fit=cover&width=300&height=300`" :title="(image.title ? image.title : null)" :alt="(image.description ? image.description : name)" />
    </div>

    <div class="gallery-entry__header d-flex align-items-center justify-content-center">
      <span class="gallery-entry__name text-display--xxs mb-0">{{ name }}</span>
    </div>

    <NuxtLink :to="`#${id}`" class="block-link-full" :aria-label="`View ${name}`"></NuxtLink>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import getImagePath from '../mixins/getImagePath.js'

export default {
  mixins: [getImagePath],

  props: {
    name: {
      type: String,
      required: true
    },
    id: {
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
.gallery-entry {
  position: relative;
  display: block;
  width: 325px;
  max-width: 100%;
  margin: 0 auto;
  color: $white;

  &__image {
    border-radius: 50%;
    box-shadow: inset 0 0 20px rgba($almost-black, 0.2);
    background: $almost-black;
    color: $white;
    overflow: hidden;
    transition: background 0.75s cubic-bezier(0.85, 0, 0.15, 1);

    .gallery-entry:hover &,
    .gallery-entry:focus &,
    .gallery-entry:focus-within {
      @include media-breakpoint-up(lg) { background: $white; }
    }
  }

  &__img {
    width: 100%;
    z-index: 0;
    border-radius: 50%;
    transition: all 0.75s cubic-bezier(0.85, 0, 0.15, 1);
    backface-visibility: hidden;

    @include media-breakpoint-up(lg) { transform: scale(1.1); }

    .gallery-entry:hover &,
    .gallery-entry:focus &,
    .gallery-entry:focus-within {
      @include media-breakpoint-up(lg) { transform: scale(1.0); }
    }
  }

  &__header {
    text-align: center;
    text-shadow: 0 0 8px $almost-black;
    background-color: rgba($almost-black, 0.3);
    transition: all 0.75s cubic-bezier(0.85, 0, 0.15, 1);
    backface-visibility: hidden;
  }

  &__name {
    // @include media-breakpoint-between(lg,xl) { font-size: 2.75vw; }

    // @include media-breakpoint-between(sm,lg) { font-size: 3.75vw; }

    // @include media-breakpoint-down(sm) { font-size: 6.5vw; }
  }
}
</style>