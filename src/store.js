import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isSignedIn: false
  },
  mutations: {
    setSignedIn (state, isSignedIn) {
      state.isSignedIn = isSignedIn
    }
  },
  actions: {
    setSignedIn ({ commit }, isSignedIn) {
      commit('setSignedIn', isSignedIn)
    }
  }
})
