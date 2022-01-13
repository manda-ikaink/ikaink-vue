<template>
  <div class="updates">
    <UiOffcanvasBtn id="updatesCanvasBtn" class="updates__btn" target="updatesCanvas" aria-label="Toggle Announcements">
      <IconStars :width="30" :height="30" aria-hidden="true" />
      <span>Updates</span>
    </UiOffcanvasBtn>

    <UiOffcanvas id="updatesCanvas" class="updates__panel" trigger="updatesCanvasBtn">
      <h1 class="text-display--xs mb-0" slot="header">News & Updates</h1>

      <div slot="body">
        <div v-for="update in updates" :key="update.id" class="update">
          <h2 class="update__heading text-display--xxs">{{ formatDate(update.date_published) }}</h2>
          <div v-html="update.text"></div>
        </div>
      </div>
    </UiOffcanvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      updates: {}
    }
  },

  mounted() {
    this.getUpdates()
  },

  methods: {
    getUpdates() {
      this.$axios.$get(`${this.$config.apiRoute}/items/announcements?fields=id,date_published,text&sort[]=-date_published&limit=20`).then(entries => {
        this.updates = entries.data

        console.log(this.updates)
      });
    },

    formatDate(date) {
      const moment = require('moment')
      const minutes = moment().diff(moment(date), 'minutes')
      const hours = moment().diff(moment(date), 'hours');
      // eslint-disable-next-line no-unused-vars
      const days = moment().diff(moment(date), 'days');

      if (minutes <= 60) {
        return `Posted ${minutes} minute${minutes === 1 ? '' : 's'} ago`
      } else if (hours <= 24) {
        return `Posted ${hours} hour${hours === 1 ? '' : 's'} ago`
      } else if (days <= 7) {
        return `Posted ${days} day${days === 1 ? '' : 's'} ago`
      } else {
        return `Posted on ${moment(date).format('MMMM DD, YYYY @ hh:mm a')}`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.updates {
  &__btn {
    position: fixed;
    top: 20px;
    left: 0;
    z-index: 1098;
    margin: 0 15px;
    background: transparent;
    border: 0;
    color: white;
    font-size: 12px;
    letter-spacing: 0.15em;
    text-transform: uppercase;

    @include media-breakpoint-up(md) { 
      top: 30px; 
      margin: 0 30px;
    }

    span {
      @include media-breakpoint-down(md) {
        font-size: 0;
        color: transparent;
      }
    }
  }

  &__panel {
    z-index: 1099;

    @include media-breakpoint-down(sm) { width: 100%; }
  }
}

.update {
  margin-bottom: 45px;
  font-size: 14px;

  &__heading {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid $gray-light;
    font-weight: bold;
  }
}
</style>
