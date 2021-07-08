<template>
  <NuxtLink :to="url" class="gallery-card" :aria-label="name">
    <div class="gallery-card__placeholder"></div>
    <picture v-if="image">
      <source :data-srcset="`${imagePath}?fit=cover&width=335&height=335`" media="(max-width: 356px)" />
      <source :data-srcset="`${imagePath}?fit=cover&width=435&height=435`" media="(min-width: 357px) and (max-width: 575px)" />
      <source :data-srcset="`${imagePath}?fit=cover&width=370&height=370`" media="(min-width: 576px) and (max-width: 767px)" />
      <source :data-srcset="`${imagePath}?fit=cover&width=435&height=435`" media="(min-width: 768px) and (max-width: 991px)" />
      <source :data-srcset="`${imagePath}?fit=cover&width=400&height=400`" media="(min-width: 1200px)" />
      <img class="gallery-card__img img-fluid w-100 blur-up lazyload" width="470" height="470" :src="`${imagePath}?fit=cover&width=100&height=100`" :data-src="`${imagePath}?fit=cover&width=470&height=470`" :title="(image.title ? image.title : null)" :alt="(image.description ? image.description : '')" />
    </picture>

    <div class="gallery-card__header d-flex align-items-center justify-content-center">
      <span class="gallery-card__name text-display--md mb-0">{{ name }}</span>
    </div>
  </NuxtLink>
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

.gallery-card {
  position: relative;
  display: block;
  width: 425px;
  max-width: 100%;
  margin: 0 auto;
  border-radius: 50%;
  box-shadow: inset 0 0 20px rgba($almost-black, 0.2);
  background: $almost-black;
  color: $white;
  overflow: hidden;
  transition: background 0.75s cubic-bezier(0.85, 0, 0.15, 1);

  &:hover,
  &:focus {
    @include media-breakpoint-up(lg) { background: $white; }
  }

  &__placeholder {
    position: relative;
    padding-top: calc(470 / 470 * 100%);
    overflow: hidden;
  }

  &__name {
    @include media-breakpoint-between(lg,xxl) { font-size: 2.75vw; }

    @include media-breakpoint-between(sm,lg) { font-size: 3.75vw; }

    @include media-breakpoint-down(sm) { font-size: 6.5vw; }
  }

  &__img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    z-index: 0;
    transition: all 0.75s cubic-bezier(0.85, 0, 0.15, 1);
    transform: translate(-50%,-50%);
    backface-visibility: hidden;

    @include media-breakpoint-up(lg) { transform: translate(-50%,-50%) scale(1.1); }

    .gallery-card:hover &,
    .gallery-card:focus & {
      @include media-breakpoint-up(lg) { transform: translate(-50%,-50%) scale(1.0); }
    }
  }

  &__header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    height: 100%;
    width: 100%;
    text-align: center;
    text-shadow: 0 0 8px $almost-black;
    background-color: rgba($almost-black, 0.3);
    transition: all 0.75s cubic-bezier(0.85, 0, 0.15, 1);
    backface-visibility: hidden;

    .gallery-card:hover &,
    .gallery-card:focus & {
      @include media-breakpoint-up(lg) {
        background-color: rgba($white, 0.5);
        color: $almost-black;
        text-shadow: 0 0 8px $white;
      }
    }
  }
}
</style>