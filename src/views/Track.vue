<style>
</style>
<template>
  <v-container fluid>
    <h1>Record over existing Track:</h1>
    <h4>Base track: {{ track.title }}</h4>
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
  props: {
    id: {}
  },
  data() {
    return {
      playlist: undefined,
    };
  },
  watch: {
    '$route'(to, from) {
      if (to.params.id !== from.params.id) {
        this.playlist.clear();
        this.getTrack(this.id);
      }
    },
    track({ created_at, id, location, title, updated_at }) {
      this.playlist.load([
        {
          src: location,
          name: title,
          // "fadeIn": {
          //   "duration": 0.5
          // },
          // "fadeOut": {
          //   "duration": 0.5
          // },
          // "cuein": 5.918,
          // "cueout": 14.5,
          customClass: "test-custom-class",
          waveOutlineColor: "#c0dce0"
        }
      ]);
    }
  },
  computed: {
    ...mapGetters({
      track: "activeTrack"
    })
  },
  mounted() {
    this.playlist = WaveformPlaylist({
      samplesPerPixel: 3000,
      waveHeight: 100,
      container: this.$refs.playlistContainer,
      state: "cursor",
      colors: {
        waveOutlineColor: "#E0EFF1",
        timeColor: "grey",
        fadeColor: "black"
      },
      timescale: true,
      controls: {
        show: true, //whether or not to include the track controls
        width: 200 //width of controls in pixels
      },
      seekStyle: "line",
      zoomLevels: [500, 1000, 3000, 5000]
    });
    this.getTrack(this.id);
  },
  methods: {
    ...mapActions([
      'getTrack',
    ]),
  }
};
</script>
