<template>
  <nav>
    <UiOffcanvasBtn id="navCanvasBtn" class="nav-toggle" target="navCanvas" aria-label="Toggle Navigation">
      <span></span>
    </UiOffcanvasBtn>

    <UiOffcanvas id="navCanvas" class="nav-canvas" trigger="navCanvasBtn">
      <div slot="body">
        <ul id="nav-main" class="nav">
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
            <NuxtLink id="nav-link-4" class="nav__link" to="/contact">
              Contact
            </NuxtLink>
          </li>
        </ul>

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
  top: 0;
  right: 0;
  z-index: 1098;
  margin: 15px 30px 0;
  padding: 0;
  background: transparent;
  border: 0;
  cursor: pointer;

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 3px rgba($white, 0.4);
  }
  
  span {
    @include burger(40px, 4px, 6px, $white, 2px);
    display: block;
  }

  &.active span {
    @include burger-to-cross;
  }
}

.nav-canvas {
  width: 100%;
  padding: 75px 15px 20px;

  @include media-breakpoint-up(md) { width: 250px; }
}

.nav {
  height: auto;
  list-style: none;
  overflow-y: auto;
  padding: 0;
  text-align: center;

  &__item { margin-bottom: rem(20px); }

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