<template>
  <div class="page-heading">
    <h1 v-if="title" class="text-center">{{ title }}</h1>
    <span v-if="subtitle" class="text-hr">{{ subtitle }}</span>

    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: null
    },
    subtitle: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.page-heading {
  padding-top: 150px;
  background: $deep-blue;
}
</style>
