<template>
  <div id="__page">
    <Header></Header>

    <main>
      <Nuxt />
    </main>

    <Footer></Footer>
    
    <div class="bg-stars">
      <div class="bg-stars__chart"></div>

      <picture>
        <source srcset="~/assets/images/nebula-400.jpg" media="(max-width: 356px)" />
        <source srcset="~/assets/images/nebula-600.jpg" media="(min-width: 357px) and (max-width: 575px)" />
        <source srcset="~/assets/images/nebula-800.jpg" media="(min-width: 576px) and (max-width: 767px)" />
        <source srcset="~/assets/images/nebula-1200.jpg" media="(min-width: 768px) and (max-width: 991px)" />
        <source srcset="~/assets/images/nebula-1400.jpg" media="(min-width: 992px) and (max-width: 1199px)" />
        <source srcset="~/assets/images/nebula.jpg" media="(min-width: 1200px)" />
        <img class="bg-stars__img" src="~/assets/images/nebula.jpg" alt="" />
      </picture>
    </div>
  </div>
</template>