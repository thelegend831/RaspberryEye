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
    events: [],
    eventPageSize: 24
  },

  modules: {
    
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
    },

    setEvents(state, payload) {
      state.events = payload;
    },

    updateEventIndex(state, count) {
      state.eventIndex += count;
    }
  },

  actions: {
    getEvents( { commit } ) {
        Firebase
          .firestore()
          .collection('events')
          .orderBy('date', 'desc')
          .limit(this.state.eventPageSize)
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
          commit('setUser', {});
          router.push('/login');
        })
    },

    userLogin( { commit }, { email, password } ) {
      Firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          commit('setUser', user);
          router.push('/home');
        })
        .catch((err) => {
          commit('setUser', {});
          alert(err);
        });
    }
  },

  getters: {
    user: state => state.user,
    events: state => state.events
  }
})
