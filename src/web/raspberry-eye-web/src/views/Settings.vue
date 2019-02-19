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
                v-on:change="handleNotificationsToggle"
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
                name="groupTime"
                id="groupTime"
                type="text"
                v-model="groupTime"
                v-on:change="handleGroupTimeChange"
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
  props: {
    settings: Object
  },

  data() {
    return {
      notifications: true,
      groupTime: 0
    };
  },

  methods: {
    handleGroupTimeChange(e) {
      console.log(this.groupTime);
    },

    handleNotificationsToggle(e) {
      // TODO: save this user settings to the firebase store
      console.log(this.notifications);
    }
  }
};
</script>

<style>
</style>
