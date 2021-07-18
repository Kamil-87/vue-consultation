import Vue from 'vue'
import Vuex from 'vuex'
import patient from "./modules/patient"
import consultation from "./modules/consultation"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    infoStatus: {},
  },
  mutations: {
    showStatusMessage(state, status) {
      state.infoStatus.text = status.text
      state.infoStatus.status = status.status
      state.infoStatus.snackbar = status.snackbar
    },
  },
  actions: {
    showStatusMessage({commit}, status) {
      commit('showStatusMessage', status)
    }
  },
  getters: {
    infoStatus: state => state.infoStatus
  },
  modules: {
    patient,
    consultation
  }
})
