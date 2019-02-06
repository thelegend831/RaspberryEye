<template>
  <div class="home">
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'home',
  components: {},
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login');
      })
    }
  }
}
</script>
