<template>
  <div class="scrapbook-card">
    <picture v-if="image" class="scrapbook-card__image">
      <source :data-srcset="`${imagePath}?fit=cover&width=335&height=335`" media="(max-width: 356px)" />
      <source :data-srcset="`${imagePath}?fit=cover&width=435&height=435`" media="(min-width: 357px) and (max-width: 575px)" />
      <source :data-srcset="`${imagePath}?fit=cover&width=370&height=370`" media="(min-width: 576px) and (max-width: 767px)" />
      <source :data-srcset="`${imagePath}?fit=cover&width=435&height=435`" media="(min-width: 768px) and (max-width: 991px)" />
      <source :data-srcset="`${imagePath}?fit=cover&width=400&height=400`" media="(min-width: 1200px)" />
      <img class="scrapbook-card__img img-fluid w-100 blur-up lazyload" width="470" height="470" :src="`${imagePath}?fit=cover&width=100&height=100`" :data-src="`${imagePath}?fit=cover&width=470&height=470`" :title="(image.title ? image.title : null)" :alt="(image.description ? image.description : name)" />
    </picture>

    <div class="scrapbook-card__content">
      <span class="scrapbook-card__title text-display--md mb-0">{{ title }}</span>
      <p v-if="headline" class="mb-3">{{ headline }}</p>
    </div>

    <NuxtLink :to="`/scrapbook/${url}`" class="scrapbook-card block-link-full" :aria-label="title"></NuxtLink>
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
      type: String,
      required: false,
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

.scrapbook-card {
  position: relative;
  font-size: 14px;
  background: $deep-blue;
  color: $white;
  width: 100%;
  

  &__image {
    position: relative;
    overflow: hidden;
    background: $gray-100 url('~assets/images/loading.svg') no-repeat center center;

    &--1-1 { padding-top: 100%; }

    &--16-9 { padding-top: 56.25%; }

    &--4-3 { padding-top: 75%; }

    &--v-4-3 { padding-top: 127%; }
    
    &:hover,
    &:focus {
        img { transform: translate(-50%,-50%) scale(1.0); }
    }

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transition: all 0.5s cubic-bezier(0.85, 0, 0.15, 1);
      transform: translate(-50%,-50%) scale(1.1);
    }
  }

  &__content { 
    padding: 20px 15px; 
    line-height: 1.5;
  }

  &__title { 
    color: inherit;
    font-size: 16px; 
  }

  // &__categories {
  //   border-top: 1px solid $gray-200;

  //   a {
  //       color: $pink;

  //       &:hover,
  //       &:focus,
  //       &:active { color: $blue; }
  //   }
  // }
}
</style>