<template>
    <div class="section">
        <div class="field">
            <div class="control">
                <input id="notificationsSwitch" v-model="notifications" type="checkbox" name="notificationsSwitch" class="switch input" @click="handleNotificationsToggle">
                <label for="notificationsSwitch">Notifications</label>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Settings',
    props: {
        settings: Object
    },

    data() {
        return {
            notifications: false
        }
    },

    methods: {
        handleNotificationsToggle(e) {
            // TODO: save this user settings to the firebase store
        }
    }
}
</script>

<style>

</style>
