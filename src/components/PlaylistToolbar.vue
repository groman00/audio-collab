<style>
  .playlist-toolbar .buttons button {
    margin: 1rem;
  }
</style>
<template>
  <div class="playlist-toolbar">
    <div class="buttons">
      <v-btn :disabled="recording" @click="emitter.emit('record');recording = true;">Record</v-btn>
      <v-btn @click="emitter.emit('play')">Play</v-btn>
      <v-btn @click="emitter.emit('pause')">Pause</v-btn>
      <v-btn @click="emitter.emit('stop');recording = false;">Stop</v-btn>
      <v-btn @click="emitter.emit('startaudiorendering', 'wav');">Save New Track</v-btn>
    </div>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from "vuex";

  export default {
    props: ['playlist'],
    data() {
      return {
        emitter: undefined,
        recording: false,
      };
    },
    computed: {
      ...mapGetters([
        'newTrack'
      ])
    },
    watch: {
      newTrack(track) {
        console.log('new track created', track);
        alert('New Track Created!');
        this.$router.push({ name: 'track', params: { id: track.id } });
      }
    },
    created() {
      const { gotStream, logError } = this;
      const constraints = {
        audio: true
      };

      // Create emitter
      this.emitter = this.playlist.getEventEmitter();
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
      this.playlist.initExporter();

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
        'createTrack'
      ]),
      gotStream(stream) {
        this.playlist.initRecorder(stream);
      },
      logError(e) {
        console.error(e);
      }
    }
  }
</script>
