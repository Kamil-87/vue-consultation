const patients = [
  {secondName: 'Иванов', firstName: 'Иван', lastName: 'Иванович', birthday: '13-07-1953', gender: 'М', socialNumber: '145-111-111 11'},
  {secondName: 'Петров', firstName: 'Пётр', lastName: 'Петрович', birthday: '13-07-1953', gender: 'М', socialNumber: '145-111-111 11'},
  {secondName: 'Петрова', firstName: 'Мария', lastName: 'Ивановна', birthday: '13-07-1953', gender: 'Ж', socialNumber: '145-111-111 11'},
]

export default {
  state: {
    patients: []
  },
  mutations: {
    setPatients(state, payload) {
      state.patients = payload
    }
  },
  actions: {
    fetchPatients({commit}) {
      commit('setPatients', patients)
    }
  },
  getters: {
    patients: state => state.patients
  }
}
