<template>
  <ul class="pagination justify-content-center">
    <li v-if="meta.prevPage" class="page-item">
      <NuxtLink class="page-link d-flex align-items-center justify-content-center" :to="`?page=${meta.prevPage}`" aria-label="Previous" @click.prevent="switched(meta.currentPage - 1)">
        <span aria-hidden="true">&laquo;</span>
      </NuxtLink>
    </li>

    <li v-for="page in meta.lastPage" :key="`page-${page}`" class="page-item" :class="{'active': (meta.currentPage === page)}">
      <NuxtLink :to="`?page=${page}`" class="page-link d-flex align-items-center justify-content-center" @click.prevent="switched(page)">{{ page }}</NuxtLink>
    </li>

    <li v-if="meta.nextPage" class="page-item">
      <NuxtLink class="page-link d-flex align-items-center justify-content-center" :to="`?page=${meta.nextPage}`" aria-label="Next" @click.prevent="switched(meta.currentPage + 1)">
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
        if (this.pageIsOutOfBounds(page)) {
          return
        }

        this.$emit('pagination:switched', page)

        this.$router.replace({
          query: Object.assign({}, this.$route.query, { page })
        })
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
    margin-right: 15px;

    &:last-child { margin-right: 0; }
  }

  .page-link {
    line-height: 1;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    text-align: center;
  }
}
</style>