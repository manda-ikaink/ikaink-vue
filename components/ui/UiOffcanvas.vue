<template>
  <div :id="id" class="offcanvas offcanvas-end" tabindex="-1" :aria-labelledby="trigger">
    <div class="offcanvas-header">
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
    }
  }
}
</script>