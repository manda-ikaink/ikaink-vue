<template>
  <div class="project-card">
    <div class="project-card__heading d-flex align-items-center justify-content-between">
      <h2 v-if="title" class="text-display--xxs mb-0">{{ title }}</h2>
      <StatusBadge v-if="status" :status="status"></StatusBadge>
    </div>
    
    <p v-if="subtitle" class="mb-0">{{ subtitle }}</p>

    <NuxtLink :to="{ path: `/projects/${slug}`}" class="block-link-full" :aria-label="`View project: ${title}`"></NuxtLink>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: false,
      default: null
    },
    status: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>

<style lang="scss">
.project-card {
  position: relative;
  display: block;
  width: 900px;
  max-width: 100%;
  margin-bottom: 30px;
  padding: 20px;
  background: rgba($deep-blue, 0.8);
  border-radius: 20px;
  transition: all 0.3s ease;

  &:hover,
  &:focus {
    background: rgba($deep-blue, 1.0);
    color: $white;
  }

  &__heading {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid $white;
  }
}
</style>