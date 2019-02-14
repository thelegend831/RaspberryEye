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

    data() {
      return {
        scrollDebounce: true,
        numberOfEventsToShow: 24
      }
    },

    methods: {
      hookUpScroll() {
        window.onscroll = () => {
          let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight > document.documentElement.offsetHeight;
                    
          if (bottomOfWindow && this.scrollDebounce) {
            this.scrollDebounce = false;
                        
            // Load more data and reset the debounce
            console.log('Fetching more events');
            this.numberOfEventsToShow += this.numberOfEventsToShow;
            this.$store.dispatch('getEvents', { pageSize: this.numberOfEventsToShow })
            .then(() => {
              this.scrollDebounce = true;
            });
          }
        }
      }
    },

    mounted() {
      this.$store.dispatch('getEvents', { pageSize: this.numberOfEventsToShow });
      this.hookUpScroll();
    }
}
</script>
