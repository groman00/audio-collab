<style scoped>

</style>
<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column wrap align-center>
        <div class="text-xs-center">
          <v-btn to="/tracks/new" color="primary" dark large>Create a New Track</v-btn>
        </div>
        <div style="text-align: center;">
        or
        </div>
        <div>
          <v-btn to="/tracks" color="secondary" dark large>Record over an existing track</v-btn>
        </div>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

