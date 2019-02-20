<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <div class="field">
            <div class="control">
              <input
                id="notificationsSwitch"
                v-model="notifications"
                type="checkbox"
                name="notificationsSwitch"
                class="switch input"
              >
              <label for="notificationsSwitch">Notifications</label>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label for="groupTime">Group Time</label>
              <input
                type="number"
                name="groupTime"
                id="groupTime"
                v-model.lazy="groupTime"
                class="input"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Settings",
  methods: {
    updateSettings(settings) {
      this.$store.commit('setSettings', settings );
    }
  },
  computed: {
    notifications: {
      get() {
        return this.$store.getters.settings.notifications;
      },

      set(value) {
        this.updateSettings({
          groupTime: this.groupTime,
          notifications: value
        });
      }
    },

    groupTime: {
      get() {
        return this.$store.getters.settings.groupTime;
      },

      set(value) {
        this.updateSettings({
          groupTime: parseInt(value),
          notifications: this.notifications
        });
      }
    }
  }
};
</script>

<style>
</style>
