<template>
  <div id="__subpage" class="d-flex flex-column flex-auto">
    <SocialHead
      :title="page.og_title || page.title"
      :description="page.og_description || page.meta_description"
      :image="page.og_image ? `${$config.apiRoute}/assets/${page.og_image}?fit=cover&width=600&height=300` : `${$config.baseURL}/ikaink.png`"
    />

    <PageHero v-if="page" :title="page.title" :subtitle="page.subtitle">
      <div class="container-fluid d-flex flex-column align-items-center justify-content-center">
        <Breadcrumb class="mt-3 mt-lg-5"></Breadcrumb>
      </div>
    </PageHero>

    <div class="page-content d-flex flex-column flex-auto">
      <div class="container">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-if="page" v-html="page.content">
        </div>
        
        <div ref="errors" tabindex="-1">
          <transition name="fade">
            <div v-if="errored || Object.keys(errors).length !== 0" class="form-message bg--pink mb-5">
              <p v-if="errored" class="text-center mb-0">Something went wrong! We were unable to send your form response. Please try again later.</p>
              <p v-if="Object.keys(errors).length !== 0" class="text-center mb-2">Please correct the errors below.</p>
              <ul v-if="Object.keys(errors).length !== 0" class="mb-0">
                <li v-if="errors.name"><a href="#name-field" @click.prevent="$refs.name.focus()">{{ errors.name }}</a></li>
                <li v-if="errors.email"><a href="#email-field" @click.prevent="$refs.email.focus()">{{ errors.email }}</a></li>
                <li v-if="errors.subject"><a href="#subject-field" @click.prevent="$refs.subject.focus()">{{ errors.subject }}</a></li>
                <li v-if="errors.message"><a href="#message-field" @click.prevent="$refs.message.focus()">{{ errors.message }}</a></li>
                <li v-if="errors.consent"><a href="#consent-field" @click.prevent="$refs.consent.focus()">{{ errors.consent }}</a></li>
              </ul>
            </div>
          </transition>
        </div>

        <transition appear name="fade" mode="out-in">
          <div v-if="success" class="form-message bg--teal mb-4" aria-live="polite">
            <p class="text-center mb-0">Your message has been recieved! I'll get back to you shortly.</p>
          </div>

          <form v-if="!success" ref="form" class="row" :class="{'was-validated': validated}" novalidate @submit.prevent="checkForm">
            <input v-model="notBot" type="checkbox" name="contact_me_by_fax_only" tabindex="-1" autocomplete="off" style="display: none!important;">

            <div class="position-relative col-md-6 mb-3">
              <label for="name-field" class="form-label">Name *</label>
              <input
                id="name-field"
                ref="name"
                v-model="name"
                required
                aria-required="true"
                name="name"
                class="form-control"
                :aria-describedby="errors.name ? 'name-error' : null"
              />
              <span v-if="errors.name" id="name-error" class="field-message invalid-feedback">{{ errors.name }}</span>
            </div>

            <div class="position-relative col-md-6  mb-3">
              <label for="email-field" class="form-label">Email *</label>
              <input
                id="email-field"
                ref="email"
                v-model="email"
                required
                aria-required="true"
                name="email"
                type="email"
                class="form-control"
                :aria-describedby="errors.email ? 'email-error' : null"
              />
              <span v-if="errors.email" id="email-error" class="field-message invalid-feedback">{{ errors.email }}</span>
            </div>

            <div class="position-relative col-12 mb-3">
              <label for="subject-field" class="form-label">Subject *</label>
              <input
                id="subject-field"
                ref="subject"
                v-model="subject"
                required
                aria-required="true"
                name="subject"
                class="form-control"
                :aria-describedby="errors.subject ? 'subject-error' : null"
              />
              <span v-if="errors.subject" id="subject-error" class="field-message invalid-feedback">{{ errors.subject }}</span>
            </div>

            <div class="position-relative col-12 mb-3">
              <label for="message-field" class="form-label">Message *</label>
              <textarea
                id="message-field"
                ref="message"
                v-model="message"
                required
                aria-required="true"
                name="message"
                rows="4"
                class="form-control"
                :aria-describedby="errors.message ? 'message-error' : null"
              ></textarea>
              <span v-if="errors.message" id="message-error" class="field-message invalid-feedback">{{ errors.message }}</span>
            </div>

            <div class="col-12 mb-3">
              <div class="form-check">
                <input 
                  id="consent-field" 
                  ref="consent" 
                  v-model="consent"
                  class="form-check-input" 
                  type="checkbox"
                  required 
                  aria-required="true"
                  :aria-describedby="errors.consent ? 'consent-error' : null"
                />
                <label class="form-check-label" for="consent-field">
                  I agree to the terms outlined in the <NuxtLink to="/privacy-policy">privacy policy</NuxtLink> and <NuxtLink to="/terms-of-use">terms of use</NuxtLink>. I understand my submitted data will only be used for the purpose of contacting me about my inquiry.
                </label>
                <span v-if="errors.consent" id="consent-error" class="field-message invalid-feedback">{{ errors.consent }}</span>
              </div>
            </div>

            <div class="col-12 text-center mb-3">
              <button type="submit" class="form-btn bg--pink-orange">
                {{ loading ? "Sending..." : "Send" }}
              </button>
            </div>
          </form>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $axios, $config }) {
    const page = await $axios.$get(`${$config.apiRoute}/items/pages?filter[slug][_eq]=contact&fields=*.*.*`)

    return {
      page: page ? page.data[0] : null
    }
  },

  data() {
    return {
      loading: false,
      success: false,
      errored: false,
      errors: {},
      notBot: true,
      validated: false,
      name: '',
      email: '',
      subject: '',
      message: '',
      consent: false,
      date_created: Date.now(),
      status: 'unread'
    };
  },

  head() {
    return {
      title: this.page.meta_title ? this.page.meta_title : `Contact - ${this.$config.websiteTitle}`,
      meta: [
        { hid: 'description', name: 'description', content: this.page.meta_description  },
      ],
    }
  },

  methods: {
    checkForm(e) {
      this.errors = {}
      this.validated = false

      if (!this.name) {
        this.errors.name = 'Name is required'
      }

      if (!this.email) {
        this.errors.email = 'Email is required'
      } else if (!this.validEmail(this.email)) {
        this.errors.email = 'A valid email is required'
      }

      if (!this.subject) {
        this.errors.subject = 'Subject is required'
      }

      if (!this.message) {
        this.errors.message = 'Message is required'
      }

      if (!this.consent) {
        this.errors.consent = 'You must agree to our privacy policy and terms of use in order to submit your inquiry'
      }

      if (Object.keys(this.errors).length === 0) {
        this.sendMessage()
      }
      
      this.validated = true
      this.$refs.errors.focus()

      e.preventDefault()
    },

    validEmail (email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

    sendMessage() {
      this.loading = true

      if(this.notBot) {
        this.$axios
          .post(`${this.$config.apiRoute}/items/contact`, {
            name: this.name,
            email: this.email,
            subject: this.subject,
            message: this.message,
            date_created: this.date_created,
            status: this.status
          }).then(response => {
            this.success = true
            this.errored = false
            this.$ga.event({
              eventCategory: 'Contact',
              eventAction: 'submit',
              eventLabel: 'Main Contact Form'
            })
          })
          // eslint-disable-next-line node/handle-callback-err
          .catch(error => {
            this.errored = true
          })
          .finally(() => {
            this.loading = false
          });
      } else {
        this.loading = false
        this.success = true
        this.errored = false
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.container-fluid {
  max-width: 1200px;
}

.container {
  max-width: 1000px;
}

.form-message {
  border-radius: 20px;
  font-size: 14px;
  padding: 10px 15px;

  a { color: inherit; }
}

.form-btn {
  padding: 12px 20px;
  border: 0;
  border-radius: 10px;
  color: $white;
  line-height: 1;
  transition: all 0.3s ease;
}

.form-label {
  font-family: $headings-font-family;
}

.form-control {
  border-top: 0;
  border-left: 0;
  border-right: 0
}

.form-check-label {
  font-size: 12px;
}

.field-message {
  font-size: 12px;
}
</style>


