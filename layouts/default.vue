<template>
  <div id="__page">
    <Header></Header>
    <Navigation></Navigation>

    <main id="__main">
      <Nuxt />
    </main>

    <Footer></Footer>
    
    <div class="bg-stars">
      <div class="bg-stars__chart"></div>

      <picture>
        <source src="~/assets/images/nebula-vertical-thumbnail.jpg" data-srcset="~/assets/images/nebula-400.jpg" media="(max-width: 356px)" />
        <source src="~/assets/images/nebula-vertical-thumbnail.jpg" data-srcset="~/assets/images/nebula-600.jpg" media="(min-width: 357px) and (max-width: 575px)" />
        <source src="~/assets/images/nebula-horizontal-thumbnail.jpg" data-srcset="~/assets/images/nebula-800.jpg" media="(min-width: 576px) and (max-width: 767px)" />
        <source src="~/assets/images/nebula-horizontal-thumbnail.jpg" data-srcset="~/assets/images/nebula-1200.jpg" media="(min-width: 768px) and (max-width: 991px)" />
        <source src="~/assets/images/nebula-horizontal-thumbnail.jpg" data-srcset="~/assets/images/nebula-1400.jpg" media="(min-width: 992px) and (max-width: 1199px)" />
        <source src="~/assets/images/nebula-horizontal-thumbnail.jpg" data-srcset="~/assets/images/nebula.jpg" media="(min-width: 1200px)" />
        <img class="bg-stars__img blur-up lazyload" src="~/assets/images/nebula-horizontal-thumbnail.jpg" data-src="~/assets/images/nebula.jpg" alt="" />
      </picture>
    </div>
  </div>
</template>