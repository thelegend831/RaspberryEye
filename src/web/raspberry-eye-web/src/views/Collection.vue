<template>
  <div v-if="currentEvent" class="columns is-multiline">
    <moment
      v-for="(event, id) in currentEvent.events"
      :key="id"
      :event="event"
    ></moment>
  </div>
</template>

<script>
import Moment from "../components/Moment";

export default {
  name: "Collection",
  components: {
    Moment
  },
  computed: {
      currentEvent() {
          return this.$store.getters.events[this.$router.currentRoute.params.id];
      }
  },

  mounted() {
      // Guard against errors when refreshing the collections page
      if (!this.currentEvent) {
          this.$router.push({ path: '/home' });
      }
  }
};
</script>

<style>
</style>
