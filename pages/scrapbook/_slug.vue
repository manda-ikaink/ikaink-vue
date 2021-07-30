<template>
  <div id="__scrapbook-page" class="d-flex flex-column flex-auto">
    <PageHero :title="page.title" :subtitle="date">
      <div class="container-fluid d-flex flex-column align-items-center justify-content-center">
        <Breadcrumb></Breadcrumb>
      </div>
    </PageHero>

    <div class="page-content d-flex flex-column flex-auto">
      <div class="container">
        <p v-if="page.headline" class="text-display--xs text-center mb-0">{{ page.headline }}</p>
        <hr v-if="page.headline">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="page.content">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import moment from 'moment';

export default {
  async asyncData ({ params, $axios, error }) {
    return await $axios.$get(`https://admin.ika.ink/items/scrapbook_pages?filter[slug][_eq]=${params.slug}&fields=*.*`)
    .then(response => {
      if (response.data.length === 0) error({ statusCode: 404, message: 'Page not found' })
      
      return { 
        slug: params.slug,
        page: response.data[0],
      }
    }).catch(e => {
      error(e)
    })
  },

  head() {
    return {
      title: this.page.meta_title ? this.page.meta_title : `${this.page.title} - IKA ink`,
      meta: [
        { hid: 'description', name: 'description', content: this.page.meta_description },
      ],
    }
  },

  computed: {
    date() {
      const minutes = moment().diff(moment(this.page.date_published), 'minutes')
      const hours = moment().diff(moment(this.page.date_published), 'hours');
      // eslint-disable-next-line no-unused-vars
      const days = moment().diff(moment(this.page.date_published), 'days');

      if (minutes <= 60) {
        return `Posted ${minutes} minute${minutes === 1 ? '' : 's'} ago`
      } else if (hours <= 24) {
        return `Posted ${hours} hour${hours === 1 ? '' : 's'} ago`
      } else if (days <= 7) {
        return `Posted ${days} day${days === 1 ? '' : 's'} ago`
      } else {
        return `Posted on ${moment(this.page.date_published).format('MMMM DD, YYYY @ hh:mm a')}`
      }
    },
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