import Vue from 'vue'
import Vuex from 'vuex'
import patient from "./modules/patient";
import consultation from "./modules/consultation";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    addConsultationDialogVisible: false,
    editConsultationDialogVisible: false,
  },
  mutations: {
    showDialog(state) {
        state.addConsultationDialogVisible = true
    },
    hideDialog(state) {
        state.addConsultationDialogVisible = false
    },
    editConsultationShowDialog(state, id) {
        state.editConsultationDialogVisible = true
    },
    editConsultationHideDialog(state) {
        state.editConsultationDialogVisible = false
    },
  },
  actions: {
  },
  getters: {
    addConsultationDialogVisible: state => state.addConsultationDialogVisible,
    editConsultationDialogVisible: state => state.editConsultationDialogVisible,
  },
  modules: {
    patient,
    consultation
  }
})
