const consultation = [
  {date: '14-07-2021', time: '08:30', symptoms: 'болезнь'},
  {date: '15-07-2021', time: '09:30', symptoms: 'болезнь'},
  {date: '15-07-2021', time: '08:30', symptoms: 'болезнь'},
]

export default {
  state: {
    consultation: []
  },
  mutations: {
    setPatients(state, payload) {
      state.consultation = payload
    }
  },
  actions: {
    fetchPatients({commit}) {
      commit('setConsultation', consultation)
    }
  },
  getters: {
    consultation: state => state.consultation
  }
}
