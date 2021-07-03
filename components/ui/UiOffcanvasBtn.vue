<template>
    <button :id="id" role="button" data-bs-toggle="offcanvas" :data-bs-target="`#${target}`" :aria-controls="target" :aria-label="aria">
      <slot></slot>
    </button>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { Offcanvas } from 'bootstrap'

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    target: {
      type: String,
      required: true
    },
    aria: {
      type: [String, null],
      default: null,
      required: false
    }
  },

  mounted() {
    const canvas = document.getElementById(this.target)
    const btn = document.getElementById(this.id)

    canvas.addEventListener('show.bs.offcanvas', () => {
      btn.disabled = true
    })

    canvas.addEventListener('shown.bs.offcanvas', () => {
      btn.classList.add('active')
      btn.disabled = false
    })

    canvas.addEventListener('hide.bs.offcanvas', () => {
      btn.disabled = true
    })

    canvas.addEventListener('hidden.bs.offcanvas', () => {
      btn.classList.remove('active')
      btn.disabled = false
    })

    // eslint-disable-next-line no-new
    new Offcanvas(canvas)
  }
}
</script>