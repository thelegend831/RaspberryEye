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
      state.events = state.events.concat(payload);
    },

    updateEventIndex(state, count) {
      state.eventIndex += count;
    }
  },

  actions: {
    getEvents( { commit } ) {
      return new Promise((resolve) => {
        let cursor = new Date()
        let last = this.state.events[this.state.events.length - 1];

        if (last) {
          cursor = last.date;
        }

        Firebase
          .firestore()
          .collection('events')
          .orderBy('date', 'desc')
          .startAfter(cursor)
          .limit(this.state.eventPageSize)
          .onSnapshot((querySnapshot) => {
            let data = querySnapshot.docs.map(x => x.data());
            commit('setEvents', data);
            resolve();
          });
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
