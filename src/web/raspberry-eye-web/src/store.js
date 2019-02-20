import Vue from 'vue'
import Vuex from 'vuex'
import Firebase, { firestore } from 'firebase'
import { config } from '../private/config'
import router from './router'
import { reject } from 'q';

Firebase.initializeApp(config);
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    events: [],
    unsubscribe: undefined
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
    getEvents({ commit }, { pageSize }) {
      return new Promise((resolve, reject) => {
        // Unsubscribe if needed  
        if (this.state.unsubscribe) {
          this.state.unsubscribe();
        }

        this.state.unsubscribe = Firebase
          .firestore()
          .collection('events')
          .orderBy('date', 'desc')
          .limit(pageSize)
          .onSnapshot((querySnapshot) => {
            let data = querySnapshot.docs.map(x => x.data());

            let eventsByTimeWindow = data.reduce(function (accum, event) {
              if (accum.length) {
                let last = accum[accum.length - 1];
                if (last.end - event.date.seconds < 60) {
                  last.events.push(event);
                  last.end = event.date.seconds;
                  return accum;
                }
              }

              accum.push({ end: event.date.seconds, events: [event] });
              return accum;
            }, []);

            commit('setEvents', eventsByTimeWindow);
            resolve();
          });
      });
    },

    userLogout({ commit }) {
      Firebase
        .auth()
        .signOut()
        .then(() => {
          commit('setUser', {});
          router.push('/login');
        })
    },

    userLogin({ commit }, { email, password }) {
      Firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          // TODO: Load the user's settings before saving them to the store
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
    events: state => state.events,
  }
})
