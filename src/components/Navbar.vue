<template>
  <v-container
    fluid
    style="padding: 0"
  >
    <v-app-bar
      color="teal"
      dark
    >
      <v-spacer />
      <v-btn
        outlined
        class="ml-3"
      >
        <router-link to="/">Главная</router-link>
      </v-btn>
      <v-btn
        outlined
        class="ml-3"
      >
        <router-link to="/patients">Пациенты</router-link>
      </v-btn>
      <v-btn
        outlined
        class="ml-3"
      >
        <router-link to="/patient">Пациент</router-link>
      </v-btn>
      <v-btn
        outlined
        class="ml-3"
      >
        <router-link to="/consultation">Консультация</router-link>
      </v-btn>

    </v-app-bar>

  </v-container>
</template>

<script>
export default {}
</script>

<style scoped>

</style>
