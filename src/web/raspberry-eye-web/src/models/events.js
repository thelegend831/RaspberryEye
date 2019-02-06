import Vue from 'vue'

const state = {
    all: {},
}

const mutations = {
    SET_EVENT (state, { event }) {
        const data = event.data();
        state.all = {
            ...state.all,
            [event.id]: { sensor: data.sensor, data: data.date, image: data.image }
        }
    }
}

const actions = {
    async get ({ commit, rootState }) {
        let eventsRef = rootState.db.collection('events');
        let events = await eventsRef.get();

        events.forEach(event => commit('SET_EVENT', { event }))
    }
}

export default {namedspaced: true, state, mutations, actions }