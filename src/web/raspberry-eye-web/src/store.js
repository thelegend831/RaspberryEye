import Vue from 'vue'
import Vuex from 'vuex'
import Firebase, { firestore } from 'firebase'
import { config } from '../private/config'
import router from './router'
import { stat } from 'fs';

Firebase.initializeApp(config);
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    focus: true,
    user: {},
    settings: {},
    events: [],
    unsubscribe: undefined,
    eventPageSize: 24
  },

  modules: {

  },

  mutations: {
    incrimentPageSize(state) {
      state.eventPageSize += state.eventPageSize;
    },

    setFocus(state, focus) {
      state.focus = focus;
    },

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

    getEvents({ commit }, { groupTime }) {
      return new Promise((resolve, reject) => {
        // Unsubscribe if needed  
        if (this.state.unsubscribe) {
          this.state.unsubscribe();
        }

        this.state.unsubscribe = Firebase
          .firestore()
          .collection('events')
          .orderBy('date', 'desc')
          .limit(this.state.eventPageSize)
          .onSnapshot((querySnapshot) => {
            let data = querySnapshot.docs.map(x => x.data());

            let eventsByTimeWindow = data.reduce((accum, event) => {
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
            console.log('Finished getting events from firebase snapshot, setting window title');
            if (!this.state.focus && !document.title.startsWith('*')) {
              document.title = '* ' + document.title;
            }
            resolve(eventsByTimeWindow.length);
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
      console.log('Getting user settings from db');

      Firebase
        .firestore()
        .collection('settings')
        .doc(uid)
        .onSnapshot((doc) => {
          let newSettings = {};
          console.log('User settings in db changed');

          // we want to watch the user settings to make sure we update the events when the user changes their settings
          if (doc.exists) {
            newSettings = doc.data();
          }
          else {
            console.log('Creating new settings objcet for user: ' + uid);

            // Default user settings
            newSettings = {
              groupTime: 60,
              notifications: false
            };
          }

          commit('setSettings', newSettings);

          // now we've got the settings we can reload the events
          this.dispatch('getEvents', { groupTime: newSettings.groupTime });
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
    settings: state => state.settings,
    focus: state => state.focus
  }
})
