import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faLock, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

require('./assets/app.scss');

library.add(faEnvelope);
library.add(faLock);
library.add(faSignOutAlt);

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

let app = '';

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App),
      created() {
        firebase
        .auth()
        .onAuthStateChanged((user) => {
          if (user) {
            // Look up the user settings
            store.dispatch('getUserSettings', { uid: user.uid });
            store.commit('setUser', user);
          }
          else {
            store.commit('setUser', {});
          }
        });
      }
    }).$mount('#app');
  }
});