<template>
  <NuxtLink :to="{ path: `${$route.path}/${slug}` }" class="scrapbook-tag bg--green-teal mb-4">
    <span>
      <slot></slot>
    </span>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    slug: {
      type: String,
      required: true
    },
  },
}
</script>

<style lang="scss" scoped>
.scrapbook-tag {
  position: relative;
  display: inline-block;
  width: 250px;
  max-width: 100%;
  padding: 10px 20px;
  border-radius: 15px;
  color: $white;
  line-height: 1.5;
  text-align: center;
  transition: all 0.5s ease;
  overflow: hidden;

  > span {
    position: relative;
    z-index: 2;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: all 0.5s ease;
  }

  &:hover {
    &:after {
      background: linear-gradient(0deg, $brand-pink 0%, $brand-orange 100%);
      opacity: 1;
    }
  }
}
</style>