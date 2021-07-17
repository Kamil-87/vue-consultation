const consultationsData = [
  {id: 1, specialist: 'Невролог', day: '15-07-2021', time: '08:30', symptoms: 'болят глаза', idUser: 1},
  {id: 2, specialist: 'Гастроэнтеролог', day: '16-07-2021', time: '09:30', symptoms: 'болит поясница', idUser: 2},
  {id: 3, specialist: 'Терапевт', day: '19-07-2021', time: '08:30', symptoms: 'кашель, головная боль', idUser: 3},
  {id: 4, specialist: 'Терапевт', day: '20-07-2021', time: '08:30', symptoms: 'кашель, головная боль', idUser: 1},
]

export default {
  state: {
    addConsultationDialogVisible: false,
    consultations: JSON.parse(localStorage.getItem('consultations')) ?? [],
    currentConsultationId: null,
  },
  mutations: {
    showConsultationDialog(state, id) {
      state.addConsultationDialogVisible = true
      state.currentConsultationId = id
    },
    hideConsultationDialog(state) {
      state.addConsultationDialogVisible = false
      state.currentConsultationId = null
    },
    setConsultations(state, consultations) {
      state.consultations = consultations
      localStorage.setItem('consultations', JSON.stringify(state.consultations))
    },
    createConsultation(state, consultation) {
      state.consultations.push(consultation)
      localStorage.setItem('consultations', JSON.stringify(state.consultations))
    },
    updateConsultation(state, updateConsultation) {
      const consultation = state.consultations.find(p => p.id === updateConsultation.id)
      consultation.specialist = updateConsultation.specialist
      consultation.day = updateConsultation.day
      consultation.time = updateConsultation.time
      consultation.symptoms = updateConsultation.symptoms
      localStorage.setItem('consultations', JSON.stringify(state.consultations))
    },
    deleteConsultation(state, id) {
      const index = state.consultations.findIndex(el => el.id === id)
      state.consultations.splice(index, 1)
    }
  },
  actions: {
    fetchConsultation({commit}) {
      commit('setConsultations', consultationsData)
    },
    createConsultation({commit}, consultation) {
      commit('createConsultation', consultation)
    },
    updateConsultation({commit}, consultation) {
      commit('updateConsultation', consultation)
    },
    deleteConsultation({commit}, id) {
      commit('deleteConsultation', id)
    }
  },
  getters: {
    addConsultationDialogVisible: state => state.addConsultationDialogVisible,
    consultationsByUser: state => id => state.consultations.filter(c => c.idUser === parseInt(id)),
    consultations: state => state.consultations,
    currentConsultationId: state => state.currentConsultationId,
    consultationById: state => id => state.consultations.find(p => p.id === parseInt(id))
  }
}
