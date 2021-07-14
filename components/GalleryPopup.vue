<template>
  <div v-if="entry" ref="popup" class="gallery-popup d-flex flex-column" tab-index="-1">
    <div class="container-fluid position-relative">
      <button class="gallery-popup__close" aria-label="Close" @click="close">
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
        <div class="row justify-content-center">
          <div v-if="entry.image" class="gallery-popup__image d-flex align-items-center justify-content-center justify-content-xl-start col-sm-10 col-md-7 col-lg-8 mb-4 mb-lg-0">
            <figure class="mb-0">
              <img class="img-fluid fade-in lazyload" src="~/assets/images/loading.svg" :data-src="`${imagePath}?fit=contain&width=700`" :title="(entry.image.title ? entry.image.title : null)" :alt="(entry.image.description ? entry.image.description : entry.name)" />
            </figure>
          </div>
          <div class="gallery-popup__content col-md-5 col-lg-4">
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
// eslint-disable-next-line no-unused-vars
import getImagePath from '../mixins/getImagePath.js'

export default {
  mixins: [getImagePath],

  props: {
    entry: {
      type: [Object, null],
      required: true
    }
  },

  computed: {
    // eslint-disable-next-line object-shorthand
    imagePath: function () {
      return this.getImagePath(this.entry.image)
    }
  },

  methods: {
    close() {
      this.$emit('close-gallery')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1200px;
}

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
    padding-bottom: 30px;

    img { 
      pointer-events: none;
      border-radius: 30px; 
    }
  }

  &__content {
    @include media-breakpoint-up(md) {
      padding-left: 30px;
    }
  }

  &__sticky {
    padding-top: 30px;
    padding-bottom: 30px;
    height: calc(100vh - 60px);
    overflow-y: auto;

     @include media-breakpoint-up(md) {
      height: calc(100vh - 90px);
    }
  }
}
</style>