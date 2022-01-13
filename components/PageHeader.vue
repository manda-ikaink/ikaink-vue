<template>
  <header ref="header" class="page-header">
    <div class="banner">
    </div>
    
    <div class="container-fluid">
      <!-- Logo -->
      <div class="page-header__logo">
        <NuxtLink to="/" class="d-flex align-items-center justify-content-center">
          <img class="page-header__logo--center svg drop-shadow" src="~assets/images/ika-ink-large-white.svg" alt="IKA ink Logo" :title="$config.websiteTitle">
          <span class="page-header__logo--left drop-shadow">IKA</span>
          <span class="page-header__logo--right drop-shadow">INK</span>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  mounted () {
    this.scrollHeader()
  },

  methods: {
    scrollHeader (target = 'body', scrollClass = 'scrolled') {
      const element = this.$refs.header
      const classTarget = document.querySelector(target)
      let offSet = element.clientHeight

      window.onscroll = () => {
        scrollState(offSet)
      }

      window.onresize = () => {
        offSet = element.clientHeight
        scrollState(offSet)
      }

      function scrollState (height) {
        if (window.pageYOffset >= height) {
          classTarget.classList.add(scrollClass)
        } else {
          classTarget.classList.remove(scrollClass)
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import './assets/css/mixins/_gradients.scss';

.page-header {
  $header-transition: 0.3s ease;

  @include linear-gradient(
    to bottom, 
    transparent, 
    rgba($almost-black, 0.7) 0%, 
    rgba($almost-black, 0.5) 50%, 
    rgba($almost-black, 0) 100%);
	padding: 0.7rem 0;
	position: fixed;
	top: 0;
	left: 0;
	text-align: center;
	width: 100%;
	transition: all $header-transition;
	z-index: $zindex-fixed;

  @include media-breakpoint-up(md) { padding: 1rem 0; }

  .scrolled & {
		@include linear-gradient(
			to bottom, 
			transparent, 
			rgba($almost-black, 0.5) 0%, 
			rgba($almost-black, 0.5) 50%, 
			rgba($almost-black, 0.5) 100%);
    backdrop-filter: blur(5px);
  }

  &__logo {
		color: $white;
		display: inline-block;
		margin: 0 auto;
		transition: all $header-transition;

    a,
    a:hover { text-decoration: none;}

		&--center {
			display: inline-block;
			max-width: 40px;
			height: auto;
      margin: 0 30px;
			transition: all $header-transition; 

      @include media-breakpoint-up(md) { max-width: 60px; }

      @include media-breakpoint-down(sm) { margin: 0 15px; }
		}

		&--left,
		&--right {
			display: inline-block;
			padding: 0;
      margin-right: -12px;
      font-family: $headings-font-family;
			font-size: 18px;
			letter-spacing: 0.75em;
      line-height: 1;
			color: $white;
			transition: all $header-transition;
			text-shadow: $text-shadow;

			@include media-breakpoint-down(sm) { 
        font-size: 14px;
      }

			.scrolled & { opacity: 0; }
		}

		&--left { order: -1; }
	}
}
</style>
