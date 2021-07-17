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
      <!--        <pre>{{ consultations }}</pre>-->
      <v-list>
        <v-list-item
          v-for="consultation in consultations"
          :key="consultation.id"
        >
          <v-list-item-content>
            <v-list-item-title>{{ consultation.specialist }}</v-list-item-title>
            <v-list-item-subtitle>{{ `${consultation.day} ${consultation.time} ` }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-group>
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
            </v-list-item-group>
          </v-list-item-action>
        </v-list-item>

      </v-list>
    </v-card>

    <ConsultationAdd />

  </v-container>
</template>

<script>
import {mapActions, mapMutations, mapGetters} from "vuex"
import ConsultationAdd from "../components/consultation/ConsultationAdd";

export default {
  components: {ConsultationAdd},
  data: () => ({}),

  computed: {
    ...mapGetters({consultations: 'consultations'}),
    patient() {
      return this.$store.getters.patientById(this.$route.params.id)
    },
    age() {
      return ((Date.now() - new Date(this.patient.birthday)) / (24 * 3600 * 365.25 * 1000) | 0)
    },
  },
  methods: {
    ...mapActions(['fetchConsultation']),
    ...mapMutations(['showConsultationDialog']),
    addConsultation() {
      this.showConsultationDialog(null)
    },
    editConsultation(id) {
      this.showConsultationDialog(id)
    },
    editPatient() {
      this.$router.push({name: 'PatientEdit', params: {id: this.$route.params.id}})
    },

    //Действия с консультациями
    deleteConsultation(id) {
      this.$store.dispatch('deleteConsultation', id)
    }

  },
  mounted() {
    this.fetchConsultation()
  }
}
</script>

<style scoped>

</style>
