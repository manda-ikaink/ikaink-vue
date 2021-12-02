<template>
  <footer class="page-footer mt-auto">
    <div class="container d-flex flex-column flex-lg-row-reverse justify-content-center justify-content-lg-between pt-4">
      <div class="page-footer__social text-center mb-4 mb-lg-3 mt-lg-auto">
        <SocialMedia></SocialMedia>
      </div>
      
      <div class="page-footer__copyright text-center text-lg-start mb-4 mb-lg-3">
        <p class="mb-0 ml-lg-2">©{{ year }} {{ $config.websiteTitle }} - All rights reserved.</p>
        <p class="mb-0 ml-lg-2">
          <NuxtLink to="/privacy-policy">Privacy Policy</NuxtLink>&nbsp;|&nbsp;
          <NuxtLink to="/terms-of-use">Terms of Use</NuxtLink>&nbsp;|&nbsp;
          <NuxtLink to="/credits">Credits</NuxtLink>
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data () {
    return {
      year: new Date().getFullYear(),
    }
  }
}
</script>

<style lang="scss">
@import './assets/css/mixins/_gradients.scss';

.page-footer {
  padding-bottom: 15px;
  @include linear-gradient(
    to top, 
    transparent, 
    rgba($almost-black, 0.4) 0%, 
    rgba($almost-black, 0.2) 30%, 
    rgba($almost-black, 0) 100%);
  font-size: 14px;

  &__copyright {
    a {
      color: $white;
  
      &:hover,
      &:focus,
      &:active {
        color: $white;
        text-shadow: 0 0 5px $white;
      }
    }
  }
}
</style>
