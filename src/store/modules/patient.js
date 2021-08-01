
const patientsData = [
  {id: 1, lastName: 'Иванов', firstName: 'Иван', patronymic: 'Иванович', birthday: '13-07-1955', gender: 'Мужской', snils: '123-456-789 00', height: 192, weight: 86},
  {id: 2, lastName: 'Петров', firstName: 'Пётр', patronymic: 'Петрович', birthday: '13-07-1953', gender: 'Мужской', snils: '145-131-111 12', height: 182, weight: 76},
  {id: 3, lastName: 'Петрова', firstName: 'Мария', patronymic: 'Петровна', birthday: '13-07-1983', gender: 'Женский', snils: '125-111-111 13', height: 172, weight: 66},
]

export default {
  namespaced: true,
  state: {
    patients: JSON.parse(localStorage.getItem('patients')) || []
  },
  mutations: {
    setPatients(state, patients) {
      state.patients = patients
      localStorage.setItem('patients', JSON.stringify(state.patients))
    },
    createPatient(state, patient) {
      state.patients.push(patient)
      localStorage.setItem('patients', JSON.stringify(state.patients))
    },
    updatePatient(state, patientData) {
      let patient = state.patients.find(p => p.id === patientData.id)
      patient.firstName = patientData.firstName
      patient.lastName = patientData.lastName
      patient.patronymic = patientData.patronymic
      patient.snils = patientData.snils
      patient.height = patientData.height
      patient.weight = patientData.weight
      patient.select = patientData.gender
      patient.birthday = patientData.birthday

      localStorage.setItem('patients', JSON.stringify(state.patients))
    },
    deletePatient(state, userId) {
      // const index = state.patients.findIndex(el => el.id === userId)
      // state.patients.splice(index, 1)
      //сделать через фильтр
      state.patients = state.patients.filter(el => el.id !== userId)
      localStorage.setItem('patients', JSON.stringify(state.patients))
    }
  },
  actions: {
    fetchPatients({commit}) {
      commit('setPatients', patientsData)
    },
    createPatient({commit}, patient) {
      commit('createPatient', patient)
    },
    updatePatient({commit}, patientData) {
      commit('updatePatient', patientData)
    },
    deletePatient({commit}, userId) {
      commit('deletePatient', userId)
    }
  },
  getters: {
    patients: state => state.patients,
    patientById(state) {
       return function (id) {
        return  state.patients.find(p => p.id === parseInt(id))
       }
    }
  }
}
