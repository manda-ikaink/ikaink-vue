<template>
  <div id="__subpage" class="d-flex flex-column flex-auto">
    <PageHero :title="page.title" :subtitle="page.subtitle">
      <div class="container-fluid d-flex flex-column align-items-center justify-content-center">
        <Breadcrumb class="mt-3 mt-lg-5"></Breadcrumb>
      </div>
    </PageHero>

    <div class="page-content d-flex flex-column flex-auto">
      <div class="container">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="page.content">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ params, $axios }) {
    const page = await $axios.$get(`https://admin.ika.ink/items/pages?filter[slug][_eq]=${params.slug}&fields=*.*.*`)

    return {
      slug: params.slug,
      page: page.data[0],
    }
  },

  head() {
    return {
      title: this.page.meta_title,
      meta: [
        { hid: 'description', name: 'description', content: this.page.meta_description },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.container-fluid {
  max-width: 1200px;
}

.container {
  max-width: 1000px;
}
</style>