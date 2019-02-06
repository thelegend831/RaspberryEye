<template>
    <div class="login">
        <h3>Sign In</h3>
        <input type="text" v-model="email" placeholder="Email"><br>
        <input type="password" v-model="password" placeholder="Password"><br>
        <button @click="login">Connection</button>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    
    name: 'login',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login: function() {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                (user) => {
                    console.log('Sign In Suceess');
                    this.$router.replace('home');
                },
                (err) => {
                    alert('Sign In Error: ' + err);
                    console.error(err)
                }
            )
        }
    }
}
</script>

<style>

</style>
