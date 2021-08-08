export default {
  methods: {
    getImagePath (image) {
      return image.id ? `${this.$config.apiRoute}/assets/${image.id}` : null
    }
  }
}