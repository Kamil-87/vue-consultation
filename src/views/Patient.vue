<template>
  <v-container v-if="patient">

    <v-btn
      @click="editPatient"
      color="primary"
    >Редактировать данные пациента
    </v-btn>
    <v-spacer class="mb-5"/>

    <v-card class="mb-5">
      <v-card-title>{{ `${patient.lastName} ${patient.firstName} ${patient.patronymic}` }}</v-card-title>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ `Возраст - ${age} ` }}</v-list-item-title>
            <v-list-item-title>{{ `Пол - ${patient.gender} ` }}</v-list-item-title>
            <v-list-item-title>{{ `СНИЛС - ${patient.snils} ` }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-title>{{ `Рост - ${patient.height} ` }}</v-list-item-title>
            <v-list-item-title>{{ `Вес - ${patient.weight} ` }}</v-list-item-title>
            <v-list-item-title>{{ `День рождения - ${patient.birthday} ` }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>

    <v-btn
      @click="addConsultation"
      color="primary"
    >Добавить консультацию
    </v-btn>
    <v-spacer class="mb-5"/>

    <v-card>
      <v-card-title>Назначенные приемы</v-card-title>

      <v-card-text>
        <v-simple-table>
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left">
                Специалист
              </th>
              <th class="text-center">
                Дата посещения
              </th>
              <th class="text-left">
                Симптомы
              </th>
              <th class="text-right">
                Действия
              </th>
            </tr>
            </thead>
            <tbody>
            <tr
              v-for="consultation in consultationsByUser"
              :key="consultation.id"
            >
              <td>{{ consultation.specialist }}</td>
              <td class="text-center">{{ `${consultation.day} ${consultation.time} ` }}</td>
              <td>{{ consultation.symptoms }}</td>

              <td class="text-right">
                <v-btn
                  icon
                  class="mx-1"
                  small
                  fab
                  color="primary"
                  @click="editConsultation(consultation.id)"
                >
                  <v-icon dark>
                    mdi-pencil
                  </v-icon>
                </v-btn>
                <v-btn
                  icon
                  class="mx-1"
                  small
                  fab
                  color="error"
                  @click="deleteConsultation(consultation.id)"
                >
                  <v-icon dark>
                    mdi-delete
                  </v-icon>
                </v-btn>
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>

    <ConsultationAdd />

  </v-container>
</template>

<script>
import {mapMutations, mapGetters,} from "vuex"
import ConsultationAdd from "../components/consultation/ConsultationAddOrEdit";

export default {
  components: {ConsultationAdd},
  data: () => ({}),

  computed: {
    ...mapGetters({consultations: 'consultations'}),
    patient() {
      return this.$store.getters.patientById(this.$route.params.id)
    },
    consultationsByUser() {
      return this.$store.getters.consultationsByUser(this.patient.id)
    },
    formatToIso() {
      return this.patient.birthday.split('-').reverse().join('-')
    },
    age() {
      return ((Date.now() - new Date(this.formatToIso)) / (24 * 3600 * 365.25 * 1000) | 0)
    }
  },
  methods: {
    ...mapMutations(['showConsultationDialog']),

    editPatient() {
      this.$router.push({name: 'PatientEdit', params: {id: this.$route.params.id}})
    },

    //Действия с консультациями
    addConsultation() {
      this.showConsultationDialog(null)
    },
    editConsultation(id) {
      this.showConsultationDialog(id)
    },
    deleteConsultation(id) {
      this.$store.dispatch('deleteConsultation', id)
    }

  }
}
</script>

<style scoped>

</style>
