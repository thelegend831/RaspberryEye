<template>
  <div class="columns is-multiline">
      <event v-for="(event, id) in this.$store.getters.events" :key="id" :event="event"></event>
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
