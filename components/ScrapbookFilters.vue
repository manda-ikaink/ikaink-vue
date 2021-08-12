<template>
  <section>
    <h2 class="visually-hidden">Filters</h2>
    <div class="filter-btn-group container-fluid d-flex justify-content-center flex-wrap">
      <button id="tag-filter-toggle" ref="filterToggle" class="filter-btn dropdown-toggle bg--blue-indigo mb-3 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#tag-filters" aria-expanded="false" aria-controls="tag-filters">
        <span class="hidden">Show Filters</span>
        <span class="shown">Hide Filters</span>
      </button>
    </div>
    
    <div id="tag-filters" ref="filterList" class="collapse bg--green-teal w-100" aria-labelledby="tag-filter-toggle">
      <div class="container py-3">
        <h3 class="filter-text">Filter by tag:</h3>

        <ul class="filter-list list-unstyled row px-0 m-0">
          <li v-for="tag in tags" :key="`tag-${tag.slug}`" class="filter-list__item col-6 col-md-4">
            <div class="form-check">
              <label :for="`${tag.slug}-tag-filter`" class="form-check-label d-flex align-items-center"><input :id="`${tag.slug}-tag-filter`" v-model="selected" class="form-check-input me-2" name="tag" type="checkbox" :value="tag.slug" @change="tagChange()"><span class="d-inline-block mt-2">{{ tag.name }}</span></label>
            </div>
          </li>
        </ul>
      </div>

       <div class="text-center">
          <a v-if="selected.length" class="filter-text d-inline-block mb-3" href="#" @click.prevent="clear()">Clear all filters</a>
        </div>
    </div>

    <transition name="fadefilter">
      <div v-if="selected.length" id="scrapbook-selected" class="container-fluid d-flex flex-wrap align-items-center pt-4">
        <h3 class="filter-text me-2">Selected filters:</h3>
        
        <template v-for="tag in tags">
          <transition :key="tag.slug" name="fadefilter">
            <div v-if="selected.includes(tag.slug)" :key="`tag-selected-${tag.slug}`" class="filter-item form-check me-2">
              <input :id="`${tag.slug}-tag-selected`" v-model="selected" class="form-check-input" name="selected-tag" type="checkbox" :value="tag.slug" @change="tagChange()">
              <label :for="`${tag.slug}-tag-selected`" class="filter-item__label form-check-label bg--pink-orange mb-0">{{ tag.name }} <IconClose :width="10" :height="10"></IconClose></label>
            </div>
          </transition>
        </template>
        <button class="filter-item form-check me-2" @click="clear()">
          <span class="filter-item__label bg--pink-orange mb-0">Clear</span>
        </button> 
      </div>
    </transition>
  </section>
</template>

<script>
import {tagFilters} from '../mixins/tagFilters'

export default {
  mixins: [tagFilters],

  props: {
    tags: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-btn-group {
  background: $deep-blue;
}

.filter-btn {
  padding: 7px 10px;
  border: 0;
  border-radius: 10px;
  color: white;
  line-height: 1;
  text-shadow: 0 0 2px $almost-black;

  &.collapsed {
    .shown { display: none; }

    .hidden { display: inline; }
  }

  &:not(.collapsed) {
    .shown { display: inline; }

    .hidden { display: none; }
  }
}

.filter-text {
  margin-bottom: 0;
  font-family: $headings-font-family;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0.15em;
  line-height: 2;
  color: inherit;
  text-transform: uppercase;
}

.filter-list {
  &__item {
    font-size: 14px;
    font-weight: bold;
    line-height: 1;
  }
}

.filter-item {
  position: relative;
  padding: 0;
  background: transparent;
  border: 0;
  border-radius: 10px;
  line-height: 1;
  letter-spacing: 0.1em;

  &__label,
  label {
    display: inline-block;
    padding: 7px 10px;
    color: $white;
    font-size: 14px;
    font-weight: bold;
    border-radius: 10px;
    line-height: 1;
    letter-spacing: 0.1em;
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    font-size: 0;
    border: 0;
    opacity: 0;
  }
}

.fadefilter-enter-active,
.fadefilter-leave-active {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.3s cubic-bezier(.7,0,.3,1);
}

.fadefilter-enter,
.fadefilter-leave-to {
  opacity: 0;
  transform: translateY(10px)!important;
  transition: all 0.3s cubic-bezier(.7,0,.3,1);
}
</style>
