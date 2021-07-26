<template>
  <span :class="`status-badge status-badge--${status}`">{{ status }}</span>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
.status-badge {
  padding: rem(5px) rem(10px);
  font-family: $headings-font-family;
  font-size: rem(14px);
  line-height: 1;
  border-radius: rem(5px);
  color: $white;

  &--pending,
  &--on-hold { 
    background-color: $brand-yellow; 
  }

  &--planning,
  &--complete,
  &--ongoing { 
    background-color: $brand-green; 
    color: $almost-black;
  }

  &--canceled,
  &--blocked { 
    background-color: $brand-red; 
  }
}
</style>
