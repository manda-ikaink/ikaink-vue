import axios from 'axios'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || 'https://ika.ink',
    apiRoute: 'https://admin.ika.ink',
    websiteTitle: 'IKA INK'
  },

  loading: {
    color: '#f67280',
    height: '3px',
    throttle: 300
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'IKA INK',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Projects, paintings, web development and everything in-between by Amanda Eldreth' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'p:domain_verify', content: '54524e210d2f2e771d67450fff0f42a3'},
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'IKA INK'
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: 'Art, notes and projects by Amanda Eldreth'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'IKA INK'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Art, notes and projects by Amanda Eldreth'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'IKA INK'
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://admin.ika.ink' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap' }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/theme.scss',
  ],

  // Style resources plugin to make global styles available in vue components
  styleResources: {
    scss: [
      './node_modules/bootstrap/scss/_functions.scss',
      './assets/css/_variables.scss',
      './node_modules/bootstrap/scss/_variables.scss',
      './node_modules/bootstrap/scss/mixins/_breakpoints.scss',
      './node_modules/bootstrap/scss/mixins/_visually-hidden.scss'
    ],
    hoistUseStatements: true
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/icons',
    '~plugins/ui'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/google-analytics',
    'nuxt-lazysizes',
    'nuxt-purgecss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://sitemap.nuxtjs.org/
    '@nuxtjs/sitemap',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Routes: https://nuxtjs.org/docs/configuration-glossary/configuration-generate/
  generate: {
    routes() {
      // scrapbook pages
      return axios.get('https://admin.ika.ink/items/scrapbook_pages?fields=slug').then(res => {
        const pages = res.data.data.map(page => {
          return '/scrapbook/' + page.slug
        })

        return pages
      })
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'IKA INK',
      short_name: 'IKA INK',
      lang: 'en'
    }
  },

  // Sitemap module configuration: https://sitemap.nuxtjs.org/
  sitemap: {
    hostname: 'https://ika.ink',
    gzip: true,
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date()
    }
  },

  // Google Analytics module configuration: https://google-analytics.nuxtjs.org/
  googleAnalytics: {
    id: 'UA-168761141-1',
    checkDuplicatedScript: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // Temp fix for error on style-resource-module error https://github.com/nuxt-community/style-resources-module/issues/143
    extend(config, { loaders }){
      loaders.scss.additionalData = '@use "sass:math";'
    }
  },

  // Lazysizes plugin for nuxt: https://github.com/ivodolenc/nuxt-lazysizes
  lazySizes: {
    extendAssetUrls: {
      img: ['src', 'srcset', 'data-src', 'data-srcset'],
      source: ['src', 'srcset', 'data-src', 'data-srcset'],
    },
    plugins: {
      blurUp: false,
      bgset: true,
    },
    lazyClass: 'lazyload',
    loadedClass: 'lazyloaded',
    loadingClass: 'lazyloading',
    preloadClass: 'lazypreload',
    errorClass: 'lazyerror',
    srcAttr: 'data-src',
    srcsetAttr: 'data-srcset',
    sizesAttr: 'data-sizes',
    loadMode: 2,
    loadHidden: true,
  },

  // PurgeCSS plugin for nuxt: https://purgecss.com/guides/nuxt.html
  purgeCSS: {
    whitelist: ['body', 'html', 'figure', 'figcaption', 'img', 'nuxt-progress', 'show', 'fade', 'active', 'collapse', 'hide', 'close', 'collapse', 'collapsing', 'modal-backdrop', 'field-message', 'form-message', 'invalid-feedback', 'was-validated', 'no-top', 'no-bottom'],
    whitelistPatterns: [/^ratio/, /^flex-/, /^d-/, /^mb-/, /^mt-/, /^ms-/, /^me-/, /^mx-/, /^my-/, /^pb-/, /^pt-/, /^ps-/, /^pe-/, /^px-/, /^py-/, /^float-/, /^status-badge/, /^offcanvas/],
  },
}
