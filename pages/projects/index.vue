<template>
  <div id="__projects" class="d-flex flex-column flex-auto">
    <SocialHead
      :title="page.og_title || page.title"
      :description="page.og_description || page.meta_description"
      :image="page.og_image ? `${$config.apiRoute}/assets/${page.og_image}?fit=cover&width=600&height=300` : `${$config.baseURL}/ikaink.png`"
    />

    <PageHeading :title="page.title" :subtitle="page.subtitle">
      <div class="d-flex align-items-center justify-content-center">
        <Breadcrumb></Breadcrumb>
      </div>
    </PageHeading>

    <div class="page-content page-content--transparent flex-auto pt-5">
      <div class="container-fluid d-flex flex-wrap justify-content-center">
        <ProjectCard v-for="project in projects" :key="project.slug" :title="project.title" :subtitle="project.subtitle" :slug="project.slug" :status="project.project_stage"></ProjectCard>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $axios, $config }) {
    const project = await $axios.$get(`${$config.apiRoute}/items/projects`)
    const projects = await $axios.$get(`${$config.apiRoute}/items/project_pages?fields=*.*&sort=sort`)

    return {
      page: project.data,
      projects: projects.data,
    }
  },

  head() {
    return {
      title: this.page.meta_title ? this.page.meta_title : `${this.page.title} - ${this.$config.websiteTitle}`,
      meta: [
        { hid: 'description', name: 'description', content: this.page.meta_description },
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
.container-fluid {
  max-width: 1400px;
}
</style>
