<template>
  <nav>
    <v-app-bar
      flat
      app
      dark
      color="primary"
    >
      <v-container>
        <!--      <v-app-bar-nav-icon @click="drawer = !drawer" class="grey&#45;&#45;text"></v-app-bar-nav-icon>-->
        <v-app-bar-title class="text-uppercase">
            <router-link
              to="/"
            >
              <v-btn outlined>
                Пациенты
              </v-btn>
            </router-link>

        </v-app-bar-title>
        <v-spacer></v-spacer>
      </v-container>
    </v-app-bar>
    <!-- dropdown menu -->

  </nav>
</template>

<script>
// import Popup from './Popup'

export default {
  components: {},
  data() {
    return {
      drawer: false,
      links: [
        {icon: 'dashboard', text: 'Dashboard', route: '/'},
        {icon: 'folder', text: 'My Projects', route: '/projects'},
        {icon: 'person', text: 'Team', route: '/team'},
      ],
      snackbar: false
    }
  }
}
</script>

<style>

</style>
