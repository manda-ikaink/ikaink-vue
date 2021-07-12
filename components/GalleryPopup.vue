<template>
  <div v-if="entry" ref="popup" class="gallery-popup" tab-index="-1">
    <div class="container-fluid">
      <button @click="close">Close</button>

      <div class="row">
        <div class="col-lg-6">
          <h2>{{ entry.name }}</h2>
          <p>Lorum ipsum dolor sit amet</p>
        </div>
        <div v-if="entry.image" class="col-lg-6">
          <img class="gallery-entry__img img-fluid w-100" :src="`${imagePath}`" :title="(entry.image.title ? entry.image.title : null)" :alt="(entry.image.description ? entry.image.description : entry.name)" />
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
.container-fluid {
  max-width: 1200px;
}

.gallery-popup {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($almost-black, 0.5);
  z-index: 1099;
  backdrop-filter: blur(5px);
}
</style>