import Vue from 'vue'
import Vuex from 'vuex'
import Firebase, { firestore } from 'firebase'
import {config} from '../private/config'
import 'firebase/firestore'
import events from './models/events'

Firebase.initializeApp(config);
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    db: Firebase.firestore()
  },
  modules: {
    events
  },
  mutations: {

  },
  actions: {

  }
})
