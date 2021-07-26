<template>
  <div id="__projects" class="d-flex flex-column flex-auto">
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
  async asyncData ({ params, $axios }) {
    const project = await $axios.$get(`https://admin.ika.ink/items/projects`)
    const projects = await $axios.$get(`https://admin.ika.ink/items/project_pages?fields=*.*&sort=sort`)

    return {
      slug: params.slug,
      page: project.data,
      projects: projects.data,
    }
  },

  head() {
    return {
      title: this.page.meta_title,
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
