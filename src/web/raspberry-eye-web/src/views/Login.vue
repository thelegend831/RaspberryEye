<template>
        <section class="hero">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <div class="column is-4 is-offset-4">
                        <img src="../assets/logo.png">
                        <div class="field">
                            <p class="control has-icons-left">
                                <input class="input" type="text" name="username" v-model="email" placeholder="Email">
                                <span class="icon is-small is-left">
                                    <font-awesome-icon icon="envelope" />
                                </span>
                            </p>
                        </div>
                        <div class="field">
                            <p class="control has-icons-left">
                                <input class="input" type="password" v-model="password" placeholder="Password">
                                <span class="icon is-small is-left">
                                    <font-awesome-icon icon="lock" />
                                </span>
                            </p>
                        </div>
                        <div class="field">
                            <p class="control">
                                <button class="button is-dark" @click="submit">Login</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
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
        submit() {
            this.$store.dispatch('userLogin', {
                email: this.email,
                password: this.password
            });
        }
    }
}
</script>

<style>

</style>
