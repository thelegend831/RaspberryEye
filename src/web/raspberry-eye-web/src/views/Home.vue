<template>
  <div class="home">
    <Event v-for="event in events" :event="event" :key="event.id" />
  </div>
</template>

<script>
import Event from '../components/Event'
import { mapState } from 'vuex'

export default {
    name: 'Home',
    component: {
      Event
    },

    computed: {
      ...mapState( {
        events: state => state.all
      })
    },

    created() {
      this.$store.dispatch('events')
    }
}
</script>
