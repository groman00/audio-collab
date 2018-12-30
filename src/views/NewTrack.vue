<template>
  <v-container class="new-track" fluid>
    <h1>Hello</h1>
    <div class="buttons">
      <v-btn :disabled="recording" @click="emitter.emit('record');recording = true;">Record</v-btn>
      <v-btn :disabled="recording" @click="emitter.emit('play')">Play</v-btn>
      <v-btn :disabled="recording" @click="emitter.emit('pause')">Pause</v-btn>
      <v-btn @click="emitter.emit('stop');recording = false;">Stop</v-btn>
      <v-btn @click="emitter.emit('startaudiorendering', 'wav');">Render to Wav</v-btn>
    </div>
    <div ref="playlistContainer" class="playlist-container"></div>
    <a v-if="downloadUrl" :href="downloadUrl">File Download</a>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import WaveformPlaylist from "waveform-playlist";

export default {
  data() {
    return {
      downloadUrl: undefined,
      emitter: undefined,
      playlist: undefined,
      recording: false
    };
  },
  mounted() {
    const { gotStream, logError } = this;
    const constraints = {
      audio: true
    };
    const playlist = WaveformPlaylist({
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
    ...mapActions(["createTrack"]),
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
