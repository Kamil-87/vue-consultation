<template>
  <div
    class="d-flex align-center justify-center fill-height"
    style="background-color: #ccc"
  >
    <v-card
      height="400" width="400"
      class="d-flex flex-column align-center justify-center text-center"
    >
      <h1
        style="font-size: 100px; color: #1976d2;"
      >404</h1>
      <v-card-text>
        <p>Страница не найдена</p>
        <router-link to="/">Перейдите на домашнюю страницу</router-link>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>

</style>
