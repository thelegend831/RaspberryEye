import Vue from 'vue'
import Vuex from 'vuex'
import Firebase, { firestore } from 'firebase'
import { config } from '../private/config'
import router from './router'

Firebase.initializeApp(config);
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    settings: {},
    events: [],
    unsubscribe: undefined
  },

  modules: {

  },

  mutations: {
    setUser(state, user) {
      state.user = user;
    },

    setSettings(state, settings) {
      state.settings = settings;
      
      // Fire and forget and send this back to the db 
      let settingsRef = Firebase.firestore().collection('settings').doc(this.state.user.uid);
      settingsRef.set(settings).then(() => {
        console.log('User settings updated');
      })
      .catch(error => {
        console.error(error);
      });
    },

    setEvents(state, payload) {
      state.events = payload;
    },

    updateEventIndex(state, count) {
      state.eventIndex += count;
    }
  },

  actions: {

    getEvents({ commit }, { pageSize, groupTime }) {
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
                if (last.end - event.date.seconds < groupTime) {
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

      if (this.state.unsubscribe) {
        this.state.unsubscribe();
      }

      Firebase
        .auth()
        .signOut()
        .then(() => {
          commit('setUser', {});
          router.push('/login');
        })
    },

    getUserSettings({ commit }, { uid }) {

      let settingsRef = Firebase.firestore().collection('settings').doc(uid);

      settingsRef.get().then((doc) => {
        if (doc.exists) {
          commit('setSettings', doc.data());
        }
        else {
          console.log('Creating new settings objcet for user: ' + uid);

          // Default user settings
          let newSettings = {
            groupTime: 60,
            notifications: false
          };

          commit('setSettings', newSettings);
        }
      });
    },

    userLogin({ commit }, { email, password }) {
      Firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
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
    settings: state => state.settings
  }
})
