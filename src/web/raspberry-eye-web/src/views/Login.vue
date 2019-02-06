<template>
    <div class="login">
        <h3>Sign In</h3>
        <input type="text" placeholder="Email"><br>
        <input type="password" placeholder="Password"><br>
        <button @click="login">Connection</button>
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {}
    },
    methods: {
        login: function() {
            this.$router.replace('home');
        }
    }
}
</script>

<style>

</style>
