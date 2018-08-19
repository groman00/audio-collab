<style>
</style>
<template>
  <v-container fluid>
    <v-card v-if="track || id === 'new'">
      <v-card-media
        src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
        height="200px"
      ></v-card-media>
      <v-card-actions>
        <!-- <v-btn flat @click="createTrack()">Add Track</v-btn> -->
        <audio-recorder @onRecordComplete="addNewTrack"/>
        <v-btn flat v-if="newSource.length" @click="playAll">Play All</v-btn>
      </v-card-actions>
      <v-card-title primary-title>
        <div>
          <!-- <h3 class="headline mb-0" v-text="track.title"/> -->
          <!-- <div v-text="track.created_at" /> -->
          <audio-player ref="originalTrack" v-if="originalSource.length" :sources="originalSource" :formats="['wav']" :volume="1"/>
          <audio-player ref="newTrack" v-if="newSource.length" :sources="newSource" :formats="['wav']" :volume="1"/>
        </div>
      </v-card-title>
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
import AudioRecorder from "../components/AudioRecorder";
import AudioPlayer from "../components/AudioPlayer";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    AudioPlayer,
    AudioRecorder
  },
  props: {
    id: {}
  },
  data() {
    return {
      originalSource: [],
      newSource: []
    };
  },
  watch: {
    track(t) {
      this.originalSource = [t.location];
    }
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
    if (this.id === 'new') {

    } else {
      this.getTrack(this.id);
    }
  },
  methods: {
    ...mapActions([
      'getTrack',
      'createTrack'
    ]),
    addNewTrack(blob) {
      console.log('blob: ', blob);

      const url = URL.createObjectURL(blob);

      if (this.originalSource.length) {
        this.newSource= [url];
      } else {
        this.originalSource = [url];
      }

      const data = new FormData();
      let config;
      data.append('audio', blob, 'new audio');
      config = {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`
        }
      };
      // this.createTrack(data, config);
    },
    playAll() {
      this.$refs.newTrack.play();
      this.$refs.originalTrack.play();
    }
  }
};
</script>
