<template>
    <div class="section">
        <!-- <div class="field">
            <div class="control">
                <input id="notificationsSwitch" v-model="notifications" type="checkbox" name="notificationsSwitch" 
                    class="switch input" @click="handleNotificationsToggle">
                <label for="notificationsSwitch">Notifications</label>
            </div>
        </div> -->
        <div class="field">
            <div class="control">
                    <slider id="groupTime" type="success" size="large" :value="groupTime" :max="600" :step="10" is-fullwidth @change="handleGroupTimeChange"></slider>
                <label for="groupTime">Group Time</label>
            </div>
        </div>
    </div>
</template>

<script>
import Slider from 'vue-bulma-slider'

export default {
    name: 'Settings',
    props: {
        settings: Object
    },

    data() {
        return {
            notifications: false,
            groupTime: 0
        }
    },

    methods: {
        handleGroupTimeChange(e) {
            console.log(this.groupTime);
        },

        handleNotificationsToggle(e) {
            // TODO: save this user settings to the firebase store
            console.log(this.notifications)
        }
    }
}
</script>

<style>

</style>
