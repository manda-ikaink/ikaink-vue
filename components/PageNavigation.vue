<template>
  <nav class="page-nav">
    <h1 class="visually-hidden">Site Navigation</h1>
    
    <UiOffcanvasBtn id="navCanvasBtn" class="nav-toggle" target="navCanvas" aria-label="Toggle Navigation">
      <span></span>
    </UiOffcanvasBtn>

    <UiOffcanvas id="navCanvas" class="nav-canvas" trigger="navCanvasBtn" direction="end" :button="false">
      <div slot="body">
        <ul id="nav-main" class="nav">
          <li class="nav__item">
            <a id="nav-link-4" class="nav__link" href="https://shop.ika.ink" target="_blank">
              Shop
            </a>
          </li>
          <li class="nav__item">
            <NuxtLink id="nav-link-0" class="nav__link" to="/about">
              About
            </NuxtLink>
          </li>
          <li class="nav__item">
            <NuxtLink id="nav-link-1" class="nav__link" to="/gallery">
              Gallery
            </NuxtLink>
          </li>
          <li class="nav__item nav__item--active">
            <NuxtLink id="nav-link-2" class="nav__link" to="/scrapbook">
              Scrapbook
            </NuxtLink>
          </li>
          <li class="nav__item">
            <NuxtLink id="nav-link-3" class="nav__link" to="/projects">
              Projects
            </NuxtLink>
          </li>
          <li class="nav__item">
            <NuxtLink id="nav-link-6" class="nav__link" to="/contact">
              Contact
            </NuxtLink>
          </li>
        </ul>

        <div class="text-center">
          <KofiButton></KofiButton>
        </div>

        <div class="nav-panel__links mt-auto">
          <div class="mb-3">
            <SocialMedia></SocialMedia>
          </div>
        </div>
      </div>
    </UiOffcanvas>
  </nav>
</template>

<style lang="scss">
@import './assets/css/mixins/_burger.scss';

.nav-toggle {
  position: fixed;
  top: 33px;
  right: 0;
  z-index: 1098;
  margin: 0 30px;
  padding: 0;
  background: transparent;
  border: 0;
  cursor: pointer;

  @include media-breakpoint-down(md) {
    top: 24px;
    margin: 0 15px;
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 3px rgba($white, 0.4);
  }
  
  span {
    @include burger(30px, 3px, 4px, $white, 1px);
    display: block;

    @include media-breakpoint-up(md) {
      @include burger(40px, 4px, 6px, $white, 2px);
    }
  }

  &.active span {
    @include burger-to-cross(auto, 3px, 4px);

    @include media-breakpoint-up(md) {
      @include burger-to-cross(auto, 4px, 6px);
    }
  }
}

.nav-canvas {
  width: 100%;
  padding: 50px 15px 0;

  @include media-breakpoint-up(md) { 
    width: 250px; 
    padding: 75px 15px 0;
  }
}

.nav {
  height: auto;
  list-style: none;
  padding: 0;
  text-align: center;

  &__item { 
    margin-bottom: rem(10px); 
  }

  &__link {
    font-family: $headings-font-family;
    font-weight: lighter;
    letter-spacing: 0.3em;
    line-height: 1.5;
    margin-bottom: 2rem;
    text-transform: uppercase;
    color: $white;
    text-decoration: none;

    &:hover,
    &:focus {  
      color: $white;
      text-shadow: 0 0 3px $white; 
      text-decoration: underline;
    }
  }
}
</style>