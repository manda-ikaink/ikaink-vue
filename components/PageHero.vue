<template>
  <div class="page-hero">
    <div class="page-hero__container container text-center pb-3 pb-lg-5">
        <h1 v-if="title" class="page-hero__title mb-3">{{ title }}</h1>
        <p v-if="subtitle" class="page-hero__subtitle mb-3">{{ subtitle }}</p>

        <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.page-hero {
  padding-top: 115px;
	background: rgba($almost-black, 0.5);

  @include media-breakpoint-up(md) { padding-top: 170px; }

  &__title {
    color: inherit;
		display: block;
		font-size: 2rem;
		letter-spacing: $letter-spacing-header-xl;
		line-height: 1.25;
		margin-bottom: 0;
		text-shadow: 3px 3px 5px $deep-blue;

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
}
</style>