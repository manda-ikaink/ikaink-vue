<template>
  <div id="__error-page" class="d-flex flex-column flex-auto align-items-center justify-content-center">
    <div class="error-content text-center">
      <h1 class="mb-0">{{ statusCode }}</h1>
      <h2>{{ message ? message : 'error'}}</h2>

      <div v-if="statusCode === 404">
        <p>The page you are looking for may have been removed, had it's name changed or is temporarily unavailable.</p>
        <p><NuxtLink class="home-btn bg--pink-orange" to="/">Go to homepage</NuxtLink></p>
      </div>

      <div v-if="statusCode === 500">
        <p>Something went wrong! Please re-fresh and try again.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NuxtError',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head () {
    return {
      title: `${this.statusCode} - ${this.message ? this.message : 'Error'}`,
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0'
        }
      ]
    }
  },

  computed: {
    statusCode () {
      return (this.error && this.error.statusCode) || 500
    },
    message () {
      return this.error.message || 'An error has occured'
    }
  }
}
</script>

<style lang="scss" scoped>
.error-content {
  width: 800px;
  max-width: 100%;
  margin: 0 auto;
}
.home-btn {
  padding: 7px 15px;
  border: 0;
  border-radius: 10px;
  color: white;
  line-height: 1;
  font-weight: bold;
}
</style>