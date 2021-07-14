<template>
  <v-container v-if="patient">
    <pre>{{$route.params.id}}</pre>
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

      <v-card>
        <v-card-title>Назначенные приемы</v-card-title>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ `Врач офтальмолог - ${'Сухов П.И.'} ` }}</v-list-item-title>
              <v-list-item-subtitle>{{ `ср. 27 июля 2021г. 15:00` }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ `Врач офтальмолог - ${'Сухов П.И.'} ` }}</v-list-item-title>
              <v-list-item-subtitle>{{ `ср. 27 июля 2021г. 15:00` }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
  </v-container>
</template>

<script>
export default {
  computed: {
    patient() {
      return this.$store.getters.patientById(this.$route.params.id)
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
