<template>
  <div id="app">
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a href="#" class="navbar-item">
          <img src="./assets/logo.png">
        </a>
      </div>
      <div class="navbar-menu">
        <!-- <div class="navbar-start">
          <router-link :to="'home'" class="navbar-item">Home</router-link>
        </div> -->
        <div class="navbar-end">
          <a href="#nogo" v-if="this.$root.userLoggedIn" class="navbar-item" @click="logout">Logout</a>
        </div>
      </div>
    </nav>    
    <router-view/>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'app',
  components: {},
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login');
      })
    }
  },
  created() {
    console.log(this.$store.state.db);
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
