<template>
  <nav class="breadcrumbs d-print-none" aria-label="breadcrumbs">
    <ul class="container list-unstyled d-flex flex-wrap mb-0" itemscope itemtype="http://schema.org/BreadcrumbList">
      <li class="breadcrumbs__item" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
        <IconStars></IconStars>
        <NuxtLink to="/" class="breadcrumbs__link" itemscope itemtype="https://schema.org/WebPage"
        itemprop="item">
          home
        </NuxtLink>
        <meta itemprop="position" :content="0" />
      </li>

      <li v-for="(item, index) in crumbs" :key="`breadcrumb-${index + 1}`" class="breadcrumbs__item" :class="item.classes" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
        <span class="d-inline-block px-2">/</span>
        <NuxtLink :to="item.path" class="breadcrumbs__link" itemscope itemtype="https://schema.org/WebPage"
        itemprop="item" :aria-current="item.active ? 'location' : 'false'">
          {{ item.name }}
        </NuxtLink>
        <meta itemprop="position" :content="index" />
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  computed: {
    crumbs() {
      const crumbs = []
      this.$route.matched.forEach((item, i, { length }) => {
        const crumb = {}
        crumb.path = item.path
        crumb.name = item.name

        // If last item
        if (i === length - 1) {
          if (item.regex.keys.length > 0) {
            crumbs.push({
              path: item.path.replace(/\/:[^/:]*$/, ''),
              name: item.name.replace(/-[^-]*$/, '')
            })
            crumb.path = this.$route.path
            crumb.name = this.$route.name
          }
          crumb.classes = 'active'
          crumb.active = true
        }

        crumbs.push(crumb)
      })

      return crumbs
    }
  }
}
</script>

