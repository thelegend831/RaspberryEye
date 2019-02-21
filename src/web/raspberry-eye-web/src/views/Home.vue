<template>
  <div class="columns is-multiline">
    <event v-for="(event, id) in this.events" :key="id" :index="id" :event="event"></event>
    <loading :active.sync="isLoading" :is-full-page="true"></loading>
  </div>
</template>

<script>
import Event from "../components/Event";
import { mapGetters } from "vuex";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "Home",
  components: {
    Event,
    Loading
  },

  data() {
    return {
      scrollDebounce: true,
      numberOfWindows: 0,
      isLoading: true
    };
  },

  computed: {
    ...mapGetters(["events", "groupTime"])
  },

  methods: {
    hookUpScroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight >
          document.documentElement.offsetHeight;

        if (bottomOfWindow && this.scrollDebounce) {
          this.scrollDebounce = false;

          // Load more data and reset the debounce
          console.log("Fetching more events");
          this.numberOfEventsToShow += this.numberOfEventsToShow;
          this.$store.commit("incrimentPageSize");
          this.$store
            .dispatch("getEvents", { groupTime: this.groupTime })
            .then(() => {
              this.scrollDebounce = true;
            });
        }
      };
    }
  },

  mounted() {
    this.hookUpScroll();

    if (this.events.length) {
      this.isLoading = false;
    } else {
      // watch the events store to be writen to
      this.$store.subscribe((mutation, state) => {
        switch (mutation.type) {
          case "setEvents":
            this.isLoading = false;
        }
      });
    }
  }
};
</script>
