<template>
  <div v-if="active && entry" ref="popup" class="gallery-popup d-flex flex-column" tab-index="-1">
    <div class="container-fluid position-relative">
      <button ref="closebtn" class="gallery-popup__close" aria-label="Close" @click="close">
        <IconClose :height="30" :width="30"></IconClose>
      </button>
    </div>

    <div class="gallery-popup__header position-relative d-flex align-items-center justify-content-center">
      <div class="container-fluid">
        <h2 class="text-display--xs mb-0">{{ entry.name }}</h2>
      </div>
    </div>

    <div class="gallery-popup__body overflow-auto">
      <div class="container">
        <div class="d-lg-flex justify-content-center">
          <div v-if="entry.image" class="gallery-popup__image">
            <figure class="text-center mb-0 no-bottom">
              <img class="img-fluid fade-in mb-3 lazyload" src="~/assets/images/loading.svg" :data-src="`${imagePath}?fit=contain&width=1000`" :title="(entry.image.title ? entry.image.title : null)" :alt="(entry.image.description ? entry.image.description : entry.name)" />
              <template v-if="entry.images.length">
                <img v-for="img in entry.images" :key="img.directus_files_id.id" class="img-fluid fade-in mb-3 lazyload" src="~/assets/images/loading.svg" :data-src="`${getImagePath(img.directus_files_id)}?fit=contain&width=1000`" :title="(img.directus_files_id.title ? img.directus_files_id.title : null)" :alt="(img.directus_files_id.description ? img.directus_files_id.description : entry.name)" />
              </template>
              <figcaption class="text-center mb-0">
                <p class="mb-0">
                  ©<span v-if="entry.year">{{ entry.year }}</span><span v-else>{{ currentYear }}</span> Amanda Eldreth, IKA ink. <br>
                  Please do not save, screen cap, copy or redistribute images.
                </p>
              </figcaption>
            </figure>
          </div>
          <div class="gallery-popup__content">
            <div class="position-relative h-100">
              <div class="gallery-popup__sticky sticky-md-top">
                <ul class="list-unstyled">
                  <li v-if="entry.year">
                    <strong>Year:</strong> {{ entry.year }}
                  </li>

                  <li v-if="entry.size">
                    <strong>Size:</strong> {{ entry.size }}
                  </li>

                  <li v-if="entry.tools">
                    <strong>Tools:</strong> {{ entry.tools }}
                  </li>
                </ul>

                <!-- eslint-disable-next-line vue/no-v-html  -->
                <div v-if="entry.description" v-html="entry.description">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getImagePath from '../../../mixins/getImagePath.js'
import focusFirst from '../../../mixins/focusFirst.js'
import focusTrap from '../../../mixins/focusTrap.js'

export default {
  mixins: [getImagePath, focusFirst, focusTrap],
  scrollToTop: false,

  props: {
    active: {
      type: Boolean,
      require: true,
    },
    focusElement: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      slug: this.$route.params.entry,
      entry: null,
      currentYear: new Date().getFullYear(),
    }
  },

  computed: {
    // eslint-disable-next-line object-shorthand
    imagePath: function () {
      return this.getImagePath(this.entry.image)
    }
  },
  
  mounted() {
    if (this.slug) this.open();

    const escape = (event) => {
      if (event.defaultPrevented) return

      switch (event.key) {
        case 'Esc': // IE/Edge specific value
        case 'Escape':
          this.close()
          break
        default:
          return
      }

      event.preventDefault();
    }

    document.addEventListener('keyup', escape)

    this.$on('hook:destroyed', () => {
      document.removeEventListener('keyup', escape);
      this.enableScroll()
    });
  },

  methods: {
    open () {
      return this.$axios.$get(`${this.$config.apiRoute}/items/gallery_entries?filter[slug][_eq]=${this.slug}&fields=name,image.*,images.directus_files_id.*,year,tools,size,link,description`)
      .then(response => {
        this.entry = response.data[0]
        this.disableScroll()
        setTimeout(() => { 
          this.focusFirst(this.$el)
          this.focusTrap(this.$el)
        }, 200);
      })
    },

    close() {
      this.restoreFocus()
      this.entry = null
      this.$emit('close-gallery')
      this.enableScroll()
      this.$router.push({ params: { entry: undefined } })
    },

    enableScroll() {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    },

    disableScroll() {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '0px'
    },

    restoreFocus() {
      const element = document.getElementById(this.focusElement)

      if (element && element.focus) element.focus()
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1600px;
}
</style>

<style lang="scss">
.gallery-popup {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba($almost-black, 0.8);
  z-index: 1099;
  backdrop-filter: blur(5px);

  &__close {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 3;
    margin: 5px 10px;
    padding: 5px 10px;
    background: transparent;
    border: 0;
    border-radius: 0;
    color: $white;

    @include media-breakpoint-up(md) { margin: 20px 10px; }
  }

  &__header {
    background: $almost-black;
    box-shadow: 0 0 25px 6px rgba($almost-black, 1);
    height: 60px;
    min-height: 60px;
    padding: 10px 0;
    z-index: 2;

    @include media-breakpoint-up(md) { 
      height: 90px; 
      min-height: 90px;
    }

    .container {
      padding-right: 65px;
    }

    h2 {
      @include media-breakpoint-down(md) { font-size: 16px; }
    }
  }

  &__body {
    strong { font-weight: 900; }
  }

  &__image {
    padding-top: 30px;

    @include media-breakpoint-up(lg) {
      flex: 1 1 auto;
      padding-bottom: 30px;
    }

    img { 
      pointer-events: none;
      border-radius: 30px; 
    }

    figcaption {
      font-size: 12px;
      line-height: 1;

      @include media-breakpoint-up(lg) {
        font-size: 14px;
      }
    }
  }

  &__content {
    @include media-breakpoint-up(lg) {
      padding-left: 30px;
      flex: 0 0 300px;
      width: 300px;
      flex-shrink: 0;
    }
  }

  &__sticky {
    padding-top: 30px;
    padding-bottom: 30px;
    height: calc(100vh - 60px);
    overflow-y: auto;

     @include media-breakpoint-up(lg) {
      height: calc(100vh - 90px);
    }
  }
}
</style>