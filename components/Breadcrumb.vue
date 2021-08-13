<template>
  <nav class="breadcrumbs d-print-none px-0" aria-label="breadcrumbs">
    <h1 class="visually-hidden">Breadcrumbs</h1>

    <ul class="list-unstyled d-flex justify-content-center flex-wrap mb-0" itemscope itemtype="https://schema.org/BreadcrumbList">
      <li class="breadcrumbs__item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <IconStars></IconStars>
        <NuxtLink to="/" class="breadcrumbs__link" itemprop="item">
          <span itemprop="name">home</span>
        </NuxtLink>
        <meta itemprop="position" :content="0" />
      </li>

      <li v-for="(item, index) in crumbs" :key="`breadcrumb-${index + 1}`" class="breadcrumbs__item" :class="item.classes" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <span class="d-inline-block px-2">/</span>
        <NuxtLink v-if="!item.active" :to="item.path" class="breadcrumbs__link" :aria-current="item.active ? 'location' : 'false'" itemprop="item">
          <span itemprop="name">{{ item.name }}</span>
        </NuxtLink>
        <span v-else class="breadcrumbs__link">
          <span itemprop="name">{{ item.name }}</span>
        </span>
        <meta itemprop="position" :content="(index + 1)" />
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  computed: {
    crumbs () {
      const crumbs = []
      const pathArray = this.$route.path.split('/')
      pathArray.shift()

      pathArray.forEach((item, i, { length }) => {
        const crumb = {}
        
        crumb.path = item[i - 1] ? `/${pathArray[i - 1]}/${item}` : `/${item}`
        crumb.name = item.replace(/-/g, ' ')
        crumb.active = (i === length - 1)

        crumbs.push(crumb)
      })

      return crumbs
    }
  }
}
</script>

<style lang="scss">
.breadcrumbs {
  padding: .75rem 1rem;

  &__item {
    max-width: 200px;
    line-height: 1.5;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__link {
    font-size: 12px;
    color: $white;

    @include media-breakpoint-up(md) { font-size: 14px; }
  }

  a.breadcrumbs__link {
    &:hover,
    &:focus { color: $pink; }
  }
}
</style>

