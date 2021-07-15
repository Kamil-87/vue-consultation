/*Страховой номер индивидуального лицевого счёта
*Insurance number of the individual personal account
* Сокращение СНИЛС = INIPA
*/

const patientsData = [
  {id: 1, lastName: 'Иванов', firstName: 'Иван', patronymic: 'Иванович', birthday: '13-07-1953', gender: 'Мужской', INIPA: '145-111-111 11', height: 192, weight: 86},
  {id: 2, lastName: 'Петров', firstName: 'Пётр', patronymic: 'Петрович', birthday: '13-07-1953', gender: 'Мужской', INIPA: '145-111-111 12', height: 182, weight: 76},
  {id: 3, lastName: 'Петрова', firstName: 'Мария', patronymic: 'Петровна', birthday: '13-07-1953', gender: 'Женский', INIPA: '145-111-111 13', height: 172, weight: 66},
]

export default {
  state: {
    patients: JSON.parse(localStorage.getItem('patients')) ?? []
  },
  mutations: {
    setPatients(state, patients) {
      state.patients = patients
      localStorage.setItem('patients', JSON.stringify(state.patients))
    },
    createPatient(state, patient) {
      state.patients.push(patient)
      localStorage.setItem('patients', JSON.stringify(state.patients))
    }
  },
  actions: {
    fetchPatients({commit}) {
      commit('setPatients', patientsData)
    },
    createPatient({commit}, patient) {
      commit('createPatient', patient)
    }
  },
  getters: {
    patients: state => state.patients,
    patientById: state => id => state.patients.find(p => p.id === id),
  }
}
