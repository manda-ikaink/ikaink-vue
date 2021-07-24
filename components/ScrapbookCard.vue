<template>
  <div class="scrapbook-card">
    <div class="position-relative">
      <picture v-if="image" class="scrapbook-card__image" :class="ratio ? `ratio--${ratio}` : 'ratio--1-1'">
        <img class="scrapbook-card__img img-fluid w-100 fade-in lazyload" :width="imageWidth" :height="imageHeight" :data-src="`${imagePath}?fit=cover&width=${imageWidth}&height=${imageHeight}`" :title="(image.title ? image.title : null)" :alt="(image.description ? image.description : title)" />
      </picture>

      <div class="scrapbook-card__content">
        <span class="scrapbook-card__title text-display--md mb-0">{{ title }}</span>
        <p v-if="headline" class="mb-0">{{ headline }}</p>
      </div>
      
      <NuxtLink :to="{ path: `/scrapbook/${url}` }" class="scrapbook-card__link block-link-full" :aria-label="title"></NuxtLink>
    </div>
    
    <div v-if="tags.length" class="scrapbook-card__tags">
      <div class="d-flex">
        <span class="d-inline-block flex-shrink-0 me-2" aria-hidden="true">
          <IconTag :width="20" :height="20"></IconTag>
        </span>
        <ul class="list-unstyled d-flex flex-wrap mb-0" aria-label="Tags">
          <li v-for="tag in tags" :key="tag.slug" class="me-2">
            <NuxtLink :to="{ path: $route.fullPath, query: { tags: tag.scrapbook_tags_slug.slug, page: undefined }}" @click="filtered(meta.currentPage + 1)">{{ tag.scrapbook_tags_slug.name }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
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
    ratio: {
      type: String,
      required: false,
      default: '1-1'
    },
    tags: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      ratios: {
        '1-1': {
          height: 368,
          width: 368
        },
        '16-9': {
          height: 207,
          width: 368
        },
        '4-3': {
          height: 267,
          width: 368
        },
        'v-4-3': {
          height: 492,
          width: 369
        }
      }
    }
  },

  computed: {
    // eslint-disable-next-line object-shorthand
    imagePath: function () {
      return this.getImagePath(this.image)
    },

    imageHeight () {
      return this.ratios[this.ratio].height
    },

    imageWidth () {
      return this.ratios[this.ratio].width
    },

  },

  methods: {
    filtered(tag) {
      this.$emit('tags:filtered', tag)
    },
  }
}
</script>

<style lang="scss">
.scrapbook-card {
  position: relative;
  font-size: 14px;
  background: $deep-blue;
  border-radius: 20px;
  color: $white;
  overflow: hidden;
  width: 100%;

  &:hover,
  &:focus {
    .scrapbook-card__img { transform: translate(-50%,-50%) scale(1.0); }
  }

  &__image {
    position: relative;
    display: block;
    overflow: hidden;
    background: $gray-100 url('~assets/images/loading.svg') no-repeat center center;
  }

  &__img {
    position: absolute;
    top: 50%;
    left: 50%;
    transition: all 0.5s cubic-bezier(0.85, 0, 0.15, 1);
    transform: translate(-50%,-50%) scale(1.1);
  }

  &__content { 
    padding: 20px 15px; 
    line-height: 1.5;
  }

  &__title { 
    color: inherit;
    font-size: 16px; 
  }

  &__tags {
    padding: 0 15px 15px;
    font-size: 14px;
    line-height: 1.5;

    > div {
      width: 100%;
      padding-top: 10px;
      border-top: 1px solid rgba($white, 0.5);
    }
  }
}
</style>