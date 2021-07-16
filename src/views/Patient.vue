<template>
  <v-container v-if="patient">

    <v-btn
      @click="editPatient"
      color="primary"
    >Редактировать данные пациента</v-btn>
    <v-spacer class="mb-5" />

      <v-card class="mb-5">
        <v-card-title>{{ `${patient.lastName} ${patient.firstName} ${patient.patronymic}` }}</v-card-title>
        <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ `Возраст - ${patient.birthday} ` }}</v-list-item-title>
                <v-list-item-title>{{ `Пол - ${patient.gender} ` }}</v-list-item-title>
                <v-list-item-title>{{ `СНИЛС - ${patient.INIPA} ` }}</v-list-item-title>
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
    >Добавить консультацию</v-btn>
    <v-spacer class="mb-5" />

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
          </v-list-item>

        </v-list>
      </v-card>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex"

export default {
  computed: {
    patient() {
      return this.$store.getters.patientById(+this.$route.params.id)
    },
    ...mapGetters({consultations: 'consultations'})
  },
  methods: {
    addConsultation() {
      this.$router.push({ name: 'ConsultationAdd', params: { id: this.$route.params.id } })
    },
    editPatient() {
      this.$router.push({ name: 'PatientEdit', params: { id: this.$route.params.id } })
    },
    ...mapActions(['fetchConsultation'])
  },
  mounted() {
    this.fetchConsultation()
  }
}
</script>

<style scoped>

</style>
