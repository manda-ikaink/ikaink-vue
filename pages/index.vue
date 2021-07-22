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
              <NuxtLink title="View Gallery of Art &amp; Illustrations " to="/gallery">Art, <span></span></NuxtLink>
            </div>
            <div class="position-relative">
              <NuxtLink title="View Scrapbook of Notes, Pictures &amp; Updates" to="/scrapbook">Notes, <span></span></NuxtLink>
            </div>
            <div class="position-relative">
              <NuxtLink title="View Development &amp; Coding Projects" to="/projects">Projects <span></span></NuxtLink>
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
export default {
  layout: 'home',

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

<style lang="scss" scoped>
.home-hero {
	position: relative;
	flex: 1 1 auto; // Assuming main element is flex w/ stretch

	&__container {
		position: relative;
		width: 900px;
		padding-top: 150px;
    padding-bottom: 60px;
    
    @include media-breakpoint-up(lg) {
      padding-top: 150px;
      padding-bottom: 150px;
    }
	}

	&__content {
		position: relative;
		width: auto;
		max-width: 100%;
	}

	&__hover {
		@include media-breakpoint-up(lg) {
			display: inline-block; 
			width: 580px;
			max-width: 100%;
		}

		&:hover {
			a {
				@include media-breakpoint-up(lg) {
					color: transparent; 
					text-shadow: 0 0 10px $deep-blue;
				
					&:hover {
						color: $white;
						text-shadow: 0 0 5px $white!important;
					}

					&:focus { text-shadow: 0 0 5px $white!important; }
				}
			}
		}
	}

	a { 
		display: inline-block;
		color: inherit; 
		text-shadow: inherit;
    transition: all 0.35s cubic-bezier(.17,.67,.83,.67);
    
    &:hover,
    &:focus { 
      color: inherit; 
      text-shadow: 0 0 5px $white;
    }

    @include media-breakpoint-up(lg) { width: 100%; }
	}
}

.home-nav {
	// display: none;
	border: 1px solid $white;
	
	@include media-breakpoint-up(lg) {
		position: absolute;
		top: 50%;
		left: 580px;
		width: 300px;
		transform: translateY(-50%);
	}
}

.star-object {
  $shooting-time: 10s;
  position: fixed;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  transform: rotateZ(45deg);

  &__star {
    position: absolute;
    left: 50%;
    top: 50%;
    height: 2px;
    background: linear-gradient(-45deg, $white, rgba(0, 0, 255, 0));
    border-radius: 999px;
    filter: drop-shadow(0 0 6px $white);
    animation:
      tail $shooting-time ease-in-out infinite,
      shooting $shooting-time ease-in-out infinite;
    top: calc(50%);
    left: calc(50% - 200px);
    opacity: 0.79;
    
    &:before,
    &:after {
      content: '';
      position: absolute;
      top: calc(50%);
      right: 0;
      height: 2px;
      background: linear-gradient(-45deg, rgba(0, 0, 255, 0), $white, rgba(0, 0, 255, 0));
      transform: translateX(50%) rotateZ(45deg);
      border-radius: 100%;
      animation: shining $shooting-time ease-in-out infinite;
    }

    &:after { transform: translateX(50%) rotateZ(-45deg); }
    
    &:first-child {
      top: calc(50% - -111px);
      left: calc(50% - 178px);
      opacity: .74;
      animation-delay: 2788ms;

      &:before,
      &:after {
        animation-delay: 2788ms;
      }
    }

    &:nth-child(2) {
      top: calc(50% - -100px);
      left: calc(50% - 436px);
      opacity: .94;
      animation-delay: 1414ms;
      

      &:before,
      &:after {
        animation-delay: 1414ms;
      }
    }

    &:nth-child(3) {
      top: calc(50% - 185px);
      left: calc(50% - 254px);
      opacity: .92;
      animation-delay: 1129ms;
      
      &:before,
      &:after {
        animation-delay: 1129ms;
      }
    }
    // @for $i from 1 through 3 {
    //   &:nth-child(#{$i}) {
    //     $delay: random(9999) + 0ms;
    //     top: calc(50% - #{random(600) - 200px});
    //     left: calc(50% - #{random(500) + 0px});
    //     animation-delay: $delay;
    //     opacity: random(50) / 100 + 0.5;
        
    //     &::before,
    //     &::after {
    //       animation-delay: $delay;
    //     }
    //   }
    // }
  }
}

@keyframes tail {
  0%,85% {
    width: 0;
  }
  
  90% {
    width: 100px;
  }
  
  100% {
    width: 0;
  }
}

@keyframes shining {
  0%,85% {
    width: 0;
  }
  
  90% {
    width: 30px;
  }
  
  100% {
    width: 0;
  }
}

@keyframes shooting {
  0%,85% {
    transform: translateX(0);
  }
  
  100% {
    transform: translateX(300px);
  }
}

@keyframes spin-clockwise {
  to {
    transform: rotateZ(360deg);
  }
}

@keyframes spin-counter-clockwise {
  to {
    transform: rotateZ(-360deg);
  }
}
</style>
