<template>
  <div class="audio-recorder">
    <v-btn icon @click.stop="toggleRecord">
        <v-icon>mic</v-icon>
    </v-btn>
    <audio v-show="audio" controls :src="audio"/>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { blobToBase64 } from '../lib/helpers';
import Recorder from "../lib/Recorder";

export default {
  data() {
    return {
      audio: null,
      audioContext: null,
      recorder: null,
      recording: false
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



          const data = new FormData();
          data.append('audio', blob, 'new audio');

          const config = {
            headers: {
              'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            },
          };

          // Create new track
          this.createTrack(data, config);


          // blobToBase64(blob)
          //   .then((base64) => {
          //     this.createTrack({
          //       audio: base64
          //     });
          //   })
          //   .catch((e) => {
          //     console.log(e);
          //   });

        });
      }
    }
  },
  methods: {
    ...mapActions([
      'createTrack'
    ]),
    toggleRecord() {
      this.recording = !this.recording;
    }
  }
};
</script>
