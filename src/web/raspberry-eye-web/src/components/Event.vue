<template>
  <div class="column is-one-quarter-desktop is-half-tablet">
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img @click="showModal()" v-bind:src="imgSrc" style="cursor: pointer;">
        </figure>
      </div>
    </div>
    <footer class="card-footer">
      <router-link v-if="hasChildren" class="card-footer-item" v-bind:to="{ name: 'collection', params: { id: this.index }}">
        <button class="button is-info">View {{ this.event.events.length }} Images In Collection</button>
      </router-link>
    </footer>
    <div class="modal" v-bind:class="{ 'is-active': isModalActive }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <p class="image is-4by3">
          <img v-bind:src="imgSrc">
        </p>
      </div>
      <button @click="hideModal()" class="modal-close is-large" aria-label="close"></button>
    </div>
  </div> 
</template>

<script>
export default {
  name: "Event",
  props: {
    event: Object,
    index: Number
  },

  methods: {
    showModal() {
      this.isModalActive = true;
    },

    hideModal() {
      this.isModalActive = false;
    }
  },

  data() {
    return {
      isModalActive: false
    };
  },

  computed: {
    imgSrc() {
      return "data:image/png;base64," + this.event.events[0].image;
    },

    hasChildren() {
        return this.event.events.length > 1;
    }
  }
};
</script>

<style>
</style>
