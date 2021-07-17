<template>
  <v-container>
    <v-card>
      <v-card-title class="mb-5">
        Пациенты
        <v-spacer></v-spacer>
        <v-text-field
            v-model="searchValue"
            append-icon="mdi-magnify"
            label="Поиск по СНИЛС или по фамилии"
            single-line
            hide-details
        ></v-text-field>
      </v-card-title>

      <v-card-text>
        <v-btn class="mb-5" @click="addPatient()">
          Добавить пациента
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
                v-for="item in filteredPatients"
                :key="item.id"
            >
              <td>{{ `${item.lastName} ${item.firstName}` }}</td>
              <td>{{ item.birthday }}</td>
              <td>{{ item.gender }}</td>
              <td>{{ item.snils }}</td>
              <td>
                <v-btn
                    icon
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
                    icon
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
                    icon
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
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  data() {
    return {
      searchValue: '',
      headers: [
        {text: 'ФИО', value: 'name',},
        {text: 'День рождения', value: 'birthday'},
        {text: 'Пол', value: 'gender'},
        {text: 'СНИЛС', value: 'snils'},
      ],
    }
  },
  computed: {
    ...mapGetters({patients: 'patients'}),
    filteredPatients() {
      console.log(this.searchValue)
      return this.patients.filter(patient => {
        return patient.lastName.toLowerCase().includes(this.searchValue.toLowerCase()) || patient.snils.toLowerCase().includes(this.searchValue.toLowerCase())
      })
    }
  },
  methods: {
    ...mapActions(['fetchPatients', 'deletePatient']),

    detailedPatient(userId) {
           this.$router.push({name: 'Patient', params: {id: userId}})
    },
    addPatient() {
      this.$router.push({name: 'PatientAdd'})
    },
    editPatient(userId) {
      this.$router.push({name: 'PatientEdit', params: {id: userId}})
    },
    deletePatient(userId) {
      this.$store.dispatch('deletePatient', userId)
    }
  },

}
</script>

<style scoped>

</style>
