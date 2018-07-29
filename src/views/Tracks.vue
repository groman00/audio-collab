<style>
</style>
<template>
  <v-container fluid>
    <v-btn color="info" @click="createTrack()">Add Track</v-btn>

    <v-list v-if="tracks.length" two-line>
      <v-list-tile v-for="track in tracks" :key="track.id" avatar @click="trackClicked(track)">
        <v-list-tile-avatar>
          <v-icon class="grey lighten-1 white--text">folder</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ track.title }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ track.created_at }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon ripple>
            <v-icon color="grey lighten-1">info</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
    <div v-else>
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      tracks: "trackItems"
    })
  },
  mounted() {
    this.getTrackItems();
  },
  methods: {
    ...mapActions(["getTrackItems", "createTrack"]),
    trackClicked(track) {
      console.log(track);
    }
  }
};
</script>
