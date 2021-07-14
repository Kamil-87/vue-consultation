const consultation = [
  {date: '15-07-2021', time: '08:30', symptoms: 'болезнь'},
  {date: '16-07-2021', time: '09:30', symptoms: 'болезнь'},
  {date: '17-07-2021', time: '08:30', symptoms: 'болезнь'},
]

export default {
  state: {
    consultation: []
  },
  mutations: {
    setConsultation(state, payload) {
      state.consultation = payload
    }
  },
  actions: {
    fetchConsultation({commit}) {
      commit('setConsultation', consultation)
    }
  },
  getters: {
    consultation: state => state.consultation
  }
}
