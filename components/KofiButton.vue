<template>
  <a class="ko-fi-btn" href="https://ko-fi.com/ikaink" target="_black" rel="noopener">
    <img src="/Ko-fi_Icon.png" alt="Ko-fi"> Tip Me!
  </a>
</template>

<style lang="scss" scoped>
.ko-fi-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: rem(30px);
  padding-left: 10px;
  padding-right: 10px;
  background: #FF5E5B;
  border-radius: 10px;
  color: $white;
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 0.05em;

  &:hover,
  &:focus {
    color: $white;
    background: #29ABE0;
  }

  img { 
    width: 30px; 
    margin-right: 10px;
  }
}
</style>