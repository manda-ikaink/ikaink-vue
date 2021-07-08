export default {
  methods: {
    getImagePath (image) {
      return image.id ? `https://admin.ika.ink/assets/${image.id}` : null
    }
  }
}