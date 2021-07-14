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
        <router-link :to="{ name: 'PatientAdd'}">
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
              <v-btn>
                <router-link :to="{ name: 'Patient', params: { id: item.id }}">
                  Подробнее
                </router-link>
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
    this.fetchPatients()
  },
  methods: {
    ...mapActions(['fetchPatients'])
  },
  fullName(item) {
    `${item.lastName} ${item.firstName} ${item.patronymic}`
  }
}
</script>

<style scoped>

</style>
