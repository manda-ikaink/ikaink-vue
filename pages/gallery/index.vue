<template>
  <div id="__gallery">
    <div class="page-heading">
      <h1 v-if="gallery.title" class="text-center">{{ gallery.title }}</h1>
      <span v-if="gallery.subtitle" class="text-hr">{{ gallery.subtitle }}</span>
      <div class="d-flex align-items-center justify-content-center">
        <Breadcrumb></Breadcrumb>
      </div>
    </div>
    <div class="page-content pt-5">
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div v-for="category in categories" :key="category.id" class="col-sm-6 col-lg-4 px-3 mb-4">
            <NuxtLink :to="`/gallery/${category.slug}`" class="gallery-card" :aria-label="category.name">
              <div class="gallery-card__placeholder"></div>
              <picture v-if="category.image">
                <source :data-srcset="`https://admin.ika.ink/assets/${category.image.id}?fit=cover&width=335&height=335`" media="(max-width: 356px)" />
                <source :data-srcset="`https://admin.ika.ink/assets/${category.image.id}?fit=cover&width=435&height=435`" media="(min-width: 357px) and (max-width: 575px)" />
                <source :data-srcset="`https://admin.ika.ink/assets/${category.image.id}?fit=cover&width=370&height=370`" media="(min-width: 576px) and (max-width: 767px)" />
                <source :data-srcset="`https://admin.ika.ink/assets/${category.image.id}?fit=cover&width=435&height=435`" media="(min-width: 768px) and (max-width: 991px)" />
                <source :data-srcset="`https://admin.ika.ink/assets/${category.image.id}?fit=cover&width=400&height=400`" media="(min-width: 1200px)" />
                <img class="gallery-card__img img-fluid w-100 blur-up lazyload" width="470" height="470" :src="`https://admin.ika.ink/assets/${category.image.id}?fit=cover&width=100&height=100`" :data-src="`https://admin.ika.ink/assets/${category.image.id}?fit=cover&width=470&height=470`" :title="(category.image.title ? category.image.title : null)" :alt="(category.image.description ? category.image.description : '')" />
              </picture>

              <div class="gallery-card__header d-flex align-items-center justify-content-center">
                <span class="gallery-card__name text-display--md mb-0">{{ category.name }}</span>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {


  async asyncData ({ params, $axios }) {
    const gallery = await $axios.$get(`https://admin.ika.ink/items/gallery`)
    const categories = await $axios.$get(`https://admin.ika.ink/items/gallery_categories?fields=slug,name,subtitle,image.*`)

    return {
      slug: params.slug,
      gallery: gallery.data,
      page: gallery,
      categories: categories.data,
    }
  },

  head() {
    return {
      title: this.gallery.meta_title,
      meta: [
        { hid: 'description', name: 'description', content: this.gallery.meta_description },
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
.container-fluid {
  max-width: 1400px;
}

.gallery-card {
  position: relative;
  display: block;
  width: 425px;
  max-width: 100%;
  margin: 0 auto;
  border-radius: 50%;
  box-shadow: inset 0 0 20px rgba($almost-black, 0.2);
  color: $white;
  overflow: hidden;
  transition: none;

  &__placeholder {
    position: relative;
    padding-top: calc(470 / 470 * 100%);
    overflow: hidden;
  }

  &__name {
    @include media-breakpoint-between(lg,xxl) { font-size: 2.75vw; }

    @include media-breakpoint-between(sm,lg) { font-size: 3.75vw; }

    @include media-breakpoint-down(sm) { font-size: 6.5vw; }
  }

  &__img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    z-index: 0;
    transition: all 0.75s cubic-bezier(0.85, 0, 0.15, 1);
    transform: translate(-50%,-50%);
    backface-visibility: hidden;

    @include media-breakpoint-up(lg) { transform: translate(-50%,-50%) scale(1.1); }

    .gallery-card:hover &,
    .gallery-card:focus & {
      @include media-breakpoint-up(lg) { transform: translate(-50%,-50%) scale(1.0); }
    }
  }

  &__header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    height: 100%;
    width: 100%;
    text-align: center;
    text-shadow: 0 0 8px $almost-black;
    background-color: rgba($almost-black, 0.3);
    transition: all 0.75s cubic-bezier(0.85, 0, 0.15, 1);
    backface-visibility: hidden;

    .gallery-card:hover &,
    .gallery-card:focus & {
      @include media-breakpoint-up(lg) {
        background-color: rgba($white, 0.5);
        color: $almost-black;
        text-shadow: 0 0 8px $white;
      }
    }
  }
}
</style>
