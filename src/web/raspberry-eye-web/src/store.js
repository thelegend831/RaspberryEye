import Vue from 'vue'
import Vuex from 'vuex'
import Firebase, { firestore } from 'firebase'
import {config} from '../private/config'
import 'firebase/firestore'
import router from './router'
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';

Firebase.initializeApp(config);
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    db: Firebase.firestore(),
    isUserLoggedIn: false
  },

  modules: {
    
  },

  mutations: {
    setIsUserLoggedIn(state, isUserLoggedIn) {
      state.isUserLoggedIn = isUserLoggedIn;
    }
  },

  actions: {
    userLogout( { commit } ) {
      Firebase
        .auth()
        .signOut()
        .then(() => {
          commit('setIsUserLoggedIn', false);
          router.push('/login');
        })
    },
    userLogin( { commit }, { email, password } ) {
      Firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          commit('setIsUserLoggedIn', true);
          router.push('/home');
          console.log('user is logged in');
        })
        .catch((err) => {
          commit('setIsUserLoggedIn', false);
          alert(err);
          console.log(err);
        })
    }
  },

  getters: {
    isUserLoggedIn: state => state.isUserLoggedIn
  }
})
