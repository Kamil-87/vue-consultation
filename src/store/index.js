import Vue from 'vue'
import Vuex from 'vuex'
import patient from "./modules/patient";
import consultation from "./modules/consultation";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    patient,
    consultation
  }
})
