<template>
  <v-container>
    <v-card>
      <v-card-title class="mb-5">
        Пациенты
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-btn class="mb-5">
        <router-link to="/patient-add">
          Добавить пациента
        </router-link>
      </v-btn>

      <v-simple-table>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">
              ФИО
            </th>
            <th class="text-left">
              День рождения
            </th>
            <th class="text-left">
              Пол
            </th>
            <th class="text-left">
              СНИЛС
            </th>
            <th class="text-left">
              Действия
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
            v-for="item in patients"
            :key="item.id"
          >
            <td>{{ `${item.lastName} ${item.firstName}` }}</td>
            <td>{{ item.birthday }}</td>
            <td>{{ item.gender }}</td>
            <td>{{ item.INIPA }}</td>
            <td>
              <v-btn
                class="mx-1"
                small
                fab
                color="primary"
                @click="detailedPatient(item.id)"
              >
                <v-icon dark>
                  mdi-open-in-new
                </v-icon>
              </v-btn>
              <v-btn
                class="mx-1"
                small
                fab
                color="primary"
                @click="editPatient(item.id)"
              >
                <v-icon dark>
                  mdi-pencil
                </v-icon>
              </v-btn>
              <v-btn
                class="mx-1"
                small
                fab
                color="error"
                @click="deletePatient(item.id)"
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
    </v-card>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  data() {
    return {
      search: '',
      headers: [
        {text: 'ФИО', value: 'name',},
        {text: 'День рождения', value: 'birthday'},
        {text: 'Пол', value: 'gender'},
        {text: 'СНИЛС', value: 'INIPA'},
      ],

    }
  },
  computed: {
    ...mapGetters({patients: 'patients'}),
    fullName() {
      console.log(this.patients)
      return `${this.patients.lastName} ${this.patients.firstName} ${this.patients.patronymic}`
    }
  },
  mounted() {
    // this.fetchPatients()
  },
  methods: {
    ...mapActions(['fetchPatients', 'deletePatient']),
    detailedPatient(userId) {
      this.$router.push({ name: 'Patient', params: { id: userId } })
    },
    editPatient(userId) {
      this.$router.push({ name: 'PatientEdit', params: { id: userId } })
    },
    deletePatient(userId) {
      this.$store.dispatch('deletePatient', userId)
    }
  },
  fullName(item) {
    `${item.lastName} ${item.firstName} ${item.patronymic}`
  }
}
</script>

<style scoped>

</style>
