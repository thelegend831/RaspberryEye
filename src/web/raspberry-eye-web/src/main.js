import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import 'bulma/css/bulma.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faEnvelope);
library.add(faLock);

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

let app = '';

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }

  // TODO: Add this to the store instead??
  // Because the firebase currentUser isn't observable,
  // and it's userful to have an observable property for 
  // a user being logged in, i've made userLoggedIn and attached
  // it to the app so it can be observed from anywhere.
  if (firebase.auth().currentUser) {
    app.userLoggedIn = true;
  }
  else {
    app.userLoggedIn = false;
  }
});