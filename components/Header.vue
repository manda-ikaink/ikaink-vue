<template>
  <header ref="header" class="page-header">
    <div class="container-fluid">
      <!-- Logo -->
      <h1 v-if="$route.path === '/'" class="page-header__logo">
        <NuxtLink to="/" class="d-flex align-items-center justify-content-center">
          <img class="page-header__logo--center svg drop-shadow" src="~assets/images/ika-ink-large-white.svg" alt="ika INK Logo" :title="$store.state.websiteTitle">
          <span class="page-header__logo--left drop-shadow">ika</span>
          <span class="page-header__logo--right drop-shadow">INK</span>
        </NuxtLink>
      </h1>
      <div  v-else class="page-header__logo">
        <NuxtLink to="/" class="d-flex align-items-center justify-content-center">
          <img class="page-header__logo--center svg drop-shadow" src="~assets/images/ika-ink-large-white.svg" alt="ika INK Logo" :title="$store.state.websiteTitle">
          <span class="page-header__logo--left drop-shadow">ika</span>
          <span class="page-header__logo--right drop-shadow">INK</span>
        </NuxtLink>
      </div>

      <!-- Menu Toggle -->
      <div class="page-header__nav-toggle">
        <div class="position-relative">
          <UiOffcanvasBtn id="navCanvasBtn" class="page-header__nav-btn" target="navCanvas" aria="Navigation">
            <span></span>
          </UiOffcanvasBtn>
        </div>
      </div>

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
