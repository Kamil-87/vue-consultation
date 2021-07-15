<template>
  <v-container
    fluid
    style="padding: 0"
  >
    <v-app-bar
      color="teal"
      dark
    >
      <v-spacer/>
      <router-link class="mr-10" style="color: white" to="/">Главная</router-link>
      <router-link style="color: white" to="/patients">Пациенты</router-link>
    </v-app-bar>

  </v-container>
</template>

<script>
export default {}
</script>

<style scoped>

</style>
