<template>
  <div class="gallery-entry" :aria-label="name">
    <div class="gallery-entry__image mb-3">
      <img v-if="image" class="gallery-entry__img img-fluid w-100 blur-up lazyload" width="320" height="400" :src="`${imagePath}?fit=cover&width=100&height=125`" :data-src="`${imagePath}?fit=cover&width=320&height=400`" :title="(image.title ? image.title : null)" :alt="(image.description ? image.description : name)" />
    </div>

    <span class="gallery-entry__name d-block text-center text-display--xxs mb-0">{{ name }}</span>

    <NuxtLink :id="`gallery-${slug}`" :ref="`gallery-${slug}`" :to="url" class="block-link-full" :aria-label="`View ${name}`" @click.native="toggleEvent(slug)"></NuxtLink>
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
      type: Number,
      required: true
    },
    image: {
      type: Object,
      required: false,
      default: null
    },
    slug: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },

  computed: {
    // eslint-disable-next-line object-shorthand
    imagePath: function () {
      return this.getImagePath(this.image)
    },
  },

  methods: {
    toggleEvent(slug) {
      this.$store.commit('gallery/addActive', `gallery-${slug}`)
      this.$emit('show-gallery', slug)
    }
  }
}
</script>

<style lang="scss">
.gallery-entry {
  position: relative;
  display: block;
  width: 325px;
  max-width: 100%;
  margin: 0 auto;
  color: $white;

  &__image {
    border-radius: 20px;
    box-shadow: inset 0 0 20px rgba($almost-black, 0.2);
    background: $almost-black;
    color: $white;
    overflow: hidden;
    clip-path: content-box;
    backface-visibility: hidden;
    transition: background 1s cubic-bezier(0.85, 0, 0.15, 1);

    .gallery-entry:hover &,
    .gallery-entry:focus &,
    .gallery-entry:focus-within {
      @include media-breakpoint-up(lg) { background: $white; }
    }
  }

  &__img {
    width: 100%;
    z-index: 0;
    border-radius: 20px;
    transition: all 1s cubic-bezier(0.85, 0, 0.15, 1);
    backface-visibility: hidden;

    @include media-breakpoint-up(lg) { transform: scale(1.1); }

    .gallery-entry:hover &,
    .gallery-entry:focus &,
    .gallery-entry:focus-within {
      @include media-breakpoint-up(lg) { transform: scale(1.0); }
    }
  }
}
</style>