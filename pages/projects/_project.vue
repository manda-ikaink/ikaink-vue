<template>
  <div id="__projects-page" class="d-flex flex-column flex-auto">
    <SocialHead
      :title="page.og_title || page.title"
      :description="page.og_description || page.meta_description"
      :image="page.og_image ? `${getImagePath(page.og_image)}?fit=cover&width=600&height=300` : `${$config.baseURL}/ikaink.png`"
    />

    <PageHero :title="page.title" :subtitle="page.subtitle">
      <div class="container-fluid d-flex flex-column align-items-center justify-content-center">
        <Breadcrumb></Breadcrumb>
      </div>
    </PageHero>

    <div class="page-content d-flex flex-column flex-auto">
      <div class="container">
        <ul v-if="page.type || page.status" class="list-unstyled mb-0">
          <li v-if="page.status">
              <span class="font-weight-bold">Status:</span> 
              <StatusBadge :status="page.project_stage"></StatusBadge>
          </li>
          <li v-if="page.type">
              <span class="font-weight-bold">Type:</span> 
              <span>{{ page.type }}</span>
          </li>
          <li v-if="page.message"><p class="mb-0"><small>Note: {{ page.message }}</small></p></li>                
        </ul>

        <hr v-if="page.type || page.status || page.message">

        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="page.content">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import getImagePath from '../../mixins/getImagePath.js'

export default {
   mixins: [getImagePath],
  async asyncData ({ params, $axios, error, $config }) {
    return await $axios.$get(`${$config.apiRoute}/items/project_pages?filter[slug][_eq]=${params.project}&fields=*.*.*`)
    .then(response => {
      if (response.data.length === 0) error({ statusCode: 404, message: 'Page not found' })
      
      return { 
        page: response.data[0]
      }
    }).catch(e => {
      error(e)
    })
  },

  head() {
    return {
      title: this.page.meta_title ? this.page.meta_title : `Project: ${this.page.title} - ${this.$config.websiteTitle}`,
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