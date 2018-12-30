<style>
</style>
<template>
  <v-container fluid>
    <div class="buttons">
      <v-btn :disabled="recording" @click="emitter.emit('record');recording = true;">Record</v-btn>
      <v-btn @click="emitter.emit('play')">Play</v-btn>
      <v-btn @click="emitter.emit('pause')">Pause</v-btn>
      <v-btn @click="emitter.emit('stop');recording = false;">Stop</v-btn>
      <v-btn @click="emitter.emit('startaudiorendering', 'wav');">Render to Wav</v-btn>
    </div>
    <div ref="playlistContainer" class="playlist-container"></div>
    <a v-if="downloadUrl" :href="downloadUrl">File Download</a>
    <!-- <div v-if="track">
    </div>
    <div v-else>
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div> -->
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import WaveformPlaylist from "waveform-playlist";
export default {
  // components: {},
  props: {
    id: {}
  },
  data() {
    return {
      downloadUrl: undefined,
      emitter: undefined,
      playlist: undefined,
      recording: false
    };
  },
  watch: {
    track({ created_at, id, location, title, updated_at }) {
      this.playlist
        .load([
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
        ])
        .then(() => {
          //can do stuff with the playlist.
          //initialize the WAV exporter.
          this.playlist.initExporter();
        });
    }
  },
  computed: {
    ...mapGetters({
      track: "activeTrack"
    })
  },
  // created() {},
  mounted() {
    const { gotStream, logError } = this;
    const constraints = {
      audio: true
    };
    const playlist = WaveformPlaylist({
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
    playlist.initExporter();
    this.emitter = playlist.getEventEmitter();
    this.emitter.on("audiorenderingfinished", (type, blob) => {
      const data = new FormData();
      let config;
      data.append("audio", blob, "new audio");
      config = {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`
        }
      };
      this.createTrack(data, config);
    });
    this.playlist = playlist;
    this.getTrack(this.id);
    // Start media stream.
    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(gotStream)
        .catch(logError);
    } else if (navigator.getUserMedia && "MediaRecorder" in window) {
      navigator.getUserMedia(constraints, gotStream, logError);
    }
  },
  methods: {
    ...mapActions([
      'getTrack',
      'createTrack'
    ]),
    gotStream(stream) {
      // console.log("stream", stream);
      // console.log(this.playlist);
      this.playlist.initRecorder(stream);
    },
    logError(e) {
      console.error(e);
    }
  }
};
</script>
