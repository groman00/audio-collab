<style>
.audio-player {
  border: solid 5px slateblue;
  padding: 20px;
  margin-bottom: 20px;
}
</style>
<template>
  <div class="audio-player">
    <h6>Total duration: {{ duration }} seconds</h6>
    <h6>Progress: {{ (progress * 100) }}%</h6>
    <v-btn flat @click="togglePlayback">{{ playing ? 'Pause' : 'Play' }}</v-btn>
    <v-btn flat @click="stop">Stop</v-btn>
  </div>
</template>
<script>
  import VueHowler from 'vue-howler'

  export default {
    mixins: [VueHowler]
  }
</script>