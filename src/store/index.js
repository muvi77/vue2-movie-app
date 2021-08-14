import Vue from 'vue'
import Vuex from 'vuex'
import message from './message'
import movie from './movie'
import about from './about'

Vue.use(Vuex)

export default new Vuex.Store({
    // state: {},
    // getters: {},
    // mutations: {},
    // actions: {},
    modules: {
        message,
        movie,
        about
    }
})