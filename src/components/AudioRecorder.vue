<template>
  <div class="audio-recorder">
    <v-btn icon @click.stop="toggleRecord">
        <v-icon>mic</v-icon>
    </v-btn>
    <audio v-show="audio" controls :src="audio"/>
  </div>
</template>

<script>
  import Recorder from "../lib/Recorder.js";

  export default {
    data() {
      return {
        audio: null,
        audioContext: null,
        recorder: null,
        recording: false,
      };
    },
    mounted() {
      // Set up audio context
      const context = new window.AudioContext();
      context.createGain = context.createGain || context.createGainNode;

      // Set up audio stream
      window.navigator.getUserMedia(
        { audio: true },
        stream => {
          var input = context.createMediaStreamSource(stream);
          this.recorder = new Recorder(input);
        },
        e => {
          window.alert("Please enable your microphone to begin recording");
        }
      );

      this.audioContext = context;
    },
    watch: {
      recording(bool) {
        if (bool) {
          this.recorder.record();
        } else {
          this.recorder.stop();
          this.recorder.exportWAV(blob => {
            console.log("callback", blob);
            const url = URL.createObjectURL(blob);
            this.audio = url;
          });
        }
      }
    },
    methods: {
      toggleRecord() {
        this.recording = !this.recording;
      }
    }
  };
</script>
