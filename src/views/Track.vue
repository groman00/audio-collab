<style>
</style>
<template>
  <v-container fluid>
    <v-card v-if="track">
      <v-card-media
        src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
        height="200px"
      ></v-card-media>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0" v-text="track.title"/>
          <div v-text="track.created_at" />
          <audio controls :src="track.location"/>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn flat @click="playTrack()">Play</v-btn>
        <v-btn flat @click="createTrack()">Add Track</v-btn>
      </v-card-actions>
    </v-card>
    <div v-else>
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    id: {
      type: String,
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      track: 'activeTrack'
    })
  },
  created() {
    // clear track

  },
  mounted() {
    this.getTrack(this.id);
  },
  methods: {
    ...mapActions([
      'getTrack',
      // 'createTrack'
    ]),
    createTrack() {
      console.log('create new track');
    },
    playTrack() {
      console.log('play track');
    }
  }
};
</script>
