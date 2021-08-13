<template>
  <div class="page-hero">
    <div class="page-hero__container container text-center pb-3 pb-lg-5">
        <h1 v-if="title" class="page-hero__title mb-3">{{ title }}</h1>
        <p v-if="subtitle" class="page-hero__subtitle mb-3">{{ subtitle }}</p>

        <slot></slot>
    </div>

    <picture v-if="heroImage">
      <source src="" :data-srcset="`${imagePath}?fit=contain&width=400`" media="(max-width: 356px)" />
      <source src="" :data-srcset="`${imagePath}?fit=contain&width=600`" media="(min-width: 357px) and (max-width: 575px)" />
      <source src="" :data-srcset="`${imagePath}?fit=contain&width=800`" media="(min-width: 576px) and (max-width: 767px)" />
      <source src="" :data-srcset="`${imagePath}?fit=contain&width=1200`" media="(min-width: 768px) and (max-width: 991px)" />
      <source src="" :data-srcset="`${imagePath}?fit=contain&width=1400`" media="(min-width: 992px) and (max-width: 1199px)" />
      <source src="" :data-srcset="`${imagePath}?fit=contain&width=1600`" media="(min-width: 1200px)" />
      <img class="page-hero__img blur-up lazyload" src="" :data-src="`${imagePath}?fit=contain&w=1600`" alt="" />
    </picture>
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
      required: false,
      default: null
    },
    subtitle: {
      type: String,
      required: false,
      default: null
    },
    heroImage: {
      type: Object,
      required: false,
      default: null
    }
  },

  computed: {
    imagePath() {
      return this.getImagePath(this.heroImage)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-hero {
  position: relative;
  padding-top: 115px;
	background: rgba($almost-black, 0.5);

  @include media-breakpoint-up(md) { padding-top: 170px; }

  &__title {
    color: inherit;
		display: block;
		font-size: 1.5rem;
		letter-spacing: $letter-spacing-header-xl;
		line-height: 1.25;
		margin-bottom: 0;
		text-shadow: 3px 3px 5px $deep-blue;

    @include media-breakpoint-up(md) { font-size: 2rem; }

		@include media-breakpoint-up(lg) { font-size: 3rem; }
  }

  &__subtitle {
    color: inherit;
		display: block;
		font-family: inherit;
		font-size: rem(16px);
		letter-spacing: $letter-spacing-header-lg;
		line-height: 1.25;
		margin-bottom: 0;
		text-shadow: 3px 3px 5px $deep-blue;
		text-transform: uppercase;
		max-width: 100%; 
  }

  &__img {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: -1;
    width: 100%;
    width: auto;
    min-width: 100%;
    min-height: 100%;
    max-width: none;
    margin-bottom: 0;
    transform: translate(-50%, -50%);
  }
}
</style>