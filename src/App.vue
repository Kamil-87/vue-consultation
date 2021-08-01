<template>
  <v-app>
    <v-snackbar
        v-model="infoStatus.snackbar"
        :timeout="3000"
        :color="infoStatus.status"
        top
        right
        min-width="250px"
        class="mt-15"
    >
      {{ infoStatus.text }}
    </v-snackbar>
    <Navbar/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar"
import {mapActions, mapGetters} from "vuex"

export default {
  name: 'App',
  components: {Navbar},
  computed: {
    ...mapGetters(['infoStatus'])
  },

  mounted() {
    if(localStorage.getItem('patients') == null) {
      this.fetchPatients()
      this.fetchConsultation()
    }

  },
  methods: {
    ...mapActions('consultation', ['fetchConsultation']),
    ...mapActions('patient', ['fetchPatients'])
  }
};
</script>
