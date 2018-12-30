<template>
  <v-container class="new-track" fluid>
    <h1>Create a New Track:</h1>
    <playlist-toolbar v-if="playlist" :playlist="playlist"/>
    <div ref="playlistContainer" class="playlist-container"></div>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import WaveformPlaylist from "waveform-playlist";
import PlaylistToolbar from '../components/PlaylistToolbar';

export default {
  components: {
    PlaylistToolbar
  },
  data() {
    return {
      playlist: undefined,
    };
  },
  mounted() {
    this.playlist = WaveformPlaylist({
      samplesPerPixel: 5000,
      zoomLevels: [1000, 5000, 9000],
      waveHeight: 100,
      container: this.$refs.playlistContainer,
      state: "cursor",
      colors: {
        waveOutlineColor: "#E0EFF1",
        timeColor: "grey",
        fadeColor: "black"
      },
      controls: {
        show: true, //whether or not to include the track controls
        width: 200 //width of controls in pixels
      }
    });
  },
};
</script>
