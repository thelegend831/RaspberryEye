<template>
  <div id="app">
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item">
          <img src="./assets/logo.png">
        </a>
      </div>
      <div class="navbar-menu">
        <div v-if="userEmail" class="navbar-start">
          <a class="navbar-item" href="#">{{ userEmail }}</a>
        </div>
        <div class="navbar-end">
          <a href="#nogo" v-if="userEmail" class="navbar-item" @click="logout">Logout</a>
        </div>
      </div>
    </nav>    
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {},
  methods: {
    logout() {
      this.$store.dispatch('userLogout');
    }
  },
  computed: {
    userEmail() {
      return this.$store.getters.user.email;
    }
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
