import Vue from 'vue'
import Vuex from 'vuex'
import Firebase, { firestore } from 'firebase'
import {config} from '../private/config'
import router from './router'

Firebase.initializeApp(config);
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    events: []
  },

  modules: {
    
  },

  mutations: {
    setUser(state, user) {
      console.log('Store setting user');
      console.log(user);
      state.user = user;
    },

    setEvents(state, payload) {
      state.events = payload;
    }
  },

  actions: {
    getEvents( { commit } ) {
      Firebase
        .firestore()
        .collection('events')
        .orderBy('date', 'desc')
        .limit(12)
        .onSnapshot((querySnapshot) => {
          let data = querySnapshot.docs.map(x => x.data());
          commit('setEvents', data);
        });
    },

    userLogout( { commit } ) {
      Firebase
        .auth()
        .signOut()
        .then(() => {
          console.log('Clearing user');
          commit('setUser', {});
          router.push('/login');
        })
    },

    userLogin( { commit }, { email, password } ) {
      Firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          console.log('setting user' + user);
          commit('setUser', user);
          router.push('/home');
          console.log(user + ': is logged in');
        })
        .catch((err) => {
          commit('setUser', {});
          alert(err);
          console.log(err);
        });
    }
  },

  getters: {
    user: state => state.user,
    events: state => state.events
  }
})
