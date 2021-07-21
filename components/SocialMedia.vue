<template>
  <ul class="social-list justify-content-center mb-0 list-unstyled d-flex">
    <li class="social-list__item">
      <a class="social-list__link" href="https://github.com/manda-ikaink" target="_blank" rel="noopener">
        <span class="visually-hidden">Github</span>
        <IconGithub></IconGithub>
      </a>
    </li>
    <li class="social-list__item">
      <a class="social-list__link" href="https://www.instagram.com/ika.ink" target="_blank" rel="noopener">
        <span class="visually-hidden">Instagram</span>
        <IconInstagram></IconInstagram>
      </a>
    </li>
    <li class="social-list__item">
      <a class="social-list__link" href="https://twitter.com/manda_ikaink" target="_blank" rel="noopener">
        <span class="visually-hidden">Twitter</span>
        <IconTwitter></IconTwitter>
      </a>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.social-list {
  &__item { margin: $social-list-margin; }

  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
    height: $social-list-height;
    width: $social-list-width;
    font-size: $social-list-size;
    background: $social-list-bg;
    border: $social-list-border;
    border-radius: $social-list-border-radius;
    color: $social-list-color;
    text-decoration: none;

    &:hover,
    &:focus,
    &:active {
      background: $social-list-hover-bg;
      border: $social-list-hover-border;
      color: $social-list-hover-color;
      text-decoration: none;
    }
  }
}
</style>