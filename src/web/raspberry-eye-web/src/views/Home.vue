<template>
  <div class="home container">
    <div class="columns">
      <event v-for="(event, id) in this.$store.getters.events" :key="id" :event="event"></event>
    </div>
  </div>
</template>

<script>
import Event from '../components/Event'

export default {
    name: 'Home',
    components: {
      Event
    },

    mounted() {
      this.$store.dispatch('getEvents');
    }
}
</script>
