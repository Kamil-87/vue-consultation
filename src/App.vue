<template>
  <v-app>
<!--    <v-snackbar v-model="snackbar" :timeout="4000" top color="success">-->
<!--      <span>Успешно</span>-->
<!--      <v-btn color="white" flat @click="snackbar = false">Close</v-btn>-->
<!--    </v-snackbar>-->
    <Navbar />
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar"
export default {
  name: 'App',
  components: {Navbar},
  data: () => ({}),
};
</script>
