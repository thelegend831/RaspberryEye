<template>
  <div class="column is-one-quarter-desktop is-half-tablet">
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img @click="showModal()" v-bind:src="imgSrc" style="cursor: pointer;">
        </figure>
      </div>
    </div>
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
  name: "Moment",
  props: {
    event: Object
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
      return "data:image/png;base64," + this.event.image;
    }
  }
};
</script>

<style>
</style>
