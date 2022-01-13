<template>
  <div :id="id" :class="`offcanvas offcanvas-${direction}`" tabindex="-1" :aria-labelledby="trigger">
    <div class="offcanvas-header align-items-start" :class="direction === 'start' ? 'flex-row-reverse' : null">
      <button v-if="button" type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      <slot name="header"></slot>
    </div>

    <div class="offcanvas-body">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    trigger: {
      type: String,
      required: true
    },
    direction: {
      type: String,
      required: false,
      default: 'start'
    },
    button: {
      type: Boolean,
      required: false,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.offcanvas {
  transition: transform .8s cubic-bezier(.7,0,.3,1);
}
</style>