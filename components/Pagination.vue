<template>
  <ul class="pagination justify-content-center flex-wrap">
    <li v-if="meta.prevPage" class="page-item">
      <NuxtLink class="page-link d-flex align-items-center justify-content-center" :to="{ path: $route.fullPath, query: { page: meta.prevPage }}" aria-label="Previous" rel="prev" @click.prevent="switched(meta.currentPage - 1)">
        <span aria-hidden="true">&laquo;</span>
      </NuxtLink>
    </li>

    <li v-for="page in meta.lastPage" :key="`page-${page}`" class="page-item" :class="{'active': (meta.currentPage === page)}">
      <NuxtLink :to="{ path: $route.fullPath, query: { page: page }}" class="page-link d-flex align-items-center justify-content-center" @click.prevent="switched(page)">{{ page }}</NuxtLink>
    </li>

    <li v-if="meta.nextPage" class="page-item">
      <NuxtLink class="page-link d-flex align-items-center justify-content-center" :to="{ path: $route.fullPath, query: { page: meta.nextPage }}" aria-label="Next" rel="next" @click.prevent="switched(meta.currentPage + 1)">
        <span aria-hidden="true">&raquo;</span>
      </NuxtLink>
    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      meta: {
        type: Object,
        required: true
      }
    },

    methods: {
      switched (page) {
        if (this.pageIsOutOfBounds(page)) return

        this.$emit('pagination:switched', page)
      },

      pageIsOutOfBounds(page) {
        return page <= 0 || page > this.meta.lastPage
      }
    }
  }
</script>

<style lang="scss" scoped>
.pagination {
  .page-item {
    margin-right: 10px;

    &:last-child { margin-right: 0; }

    &.active {
      .page-link:after { border: 1px solid $primary; }
    }
  }

  .page-link {
    position: relative;
    line-height: 1;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 14px;
    text-align: center;
    transition: all 0.3s ease-in;
    

    &:after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      z-index: 1;
      border: 1px solid $deep-blue;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: all 0s;
    }

    &:hover {
      &:after {
        width: calc(100% + 20px);
        height: calc(100% + 20px);
        opacity: 0;
        transition: opacity 0.3s ease-in, height 0.4s ease-in, width 0.4s ease-in;
      }
    }
  }
}
</style>