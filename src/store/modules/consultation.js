const consultations = [
  {id: 1, specialist: 'Офтальмолог', day: '15-07-2021', time: '08:30', symptoms: 'болят глаза'},
  {id: 2, specialist: 'Хирург', day: '16-07-2021', time: '09:30', symptoms: 'болит поясница'},
  {id: 3, specialist: 'Терапевт', day: '17-07-2021', time: '08:30', symptoms: 'кашель, головная боль'},
]

export default {
  state: {
    consultations: JSON.parse(localStorage.getItem('consultations')) ?? []
  },
  mutations: {
    setConsultations(state, consultations) {
      state.consultations = consultations
      localStorage.setItem('consultations', JSON.stringify(state.consultations))
    },
    createConsultation(state, consultation) {
      state.consultations.push(consultation)
      localStorage.setItem('consultations', JSON.stringify(state.consultations))
    }
  },
  actions: {
    fetchConsultation({commit}) {
      commit('setConsultations', consultations)
    },
    createConsultation({commit}, consultation) {
      commit('createConsultation', consultation)
    }
  },
  getters: {
    consultations: state => state.consultations
  }
}
