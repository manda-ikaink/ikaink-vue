export const tagFilters = {
  data() {
    return {
      query: this.$route.query.tags,
      selected: []
    }
  },

  watch: {
    '$route.query.tags': {
      handler(value) {
        this.updateSelected(value)
      },
      deep: true,
      immediate: true
    }
  },

  methods: {
    updateSelected(value) {
      this.selected = value ? value.split(',') : []
    },

    tagChange() {
      this.$router.replace({ query: { tags: this.selected.length ? this.selected.toString() : undefined }})
    },

    clear() {
      this.$router.replace({ query: { tags: undefined }})
    }
  }
}