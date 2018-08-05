<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <audio-recorder/>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import AudioRecorder from './components/AudioRecorder';

export default {
  name: "App",
  components: {
    AudioRecorder
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "bubble_chart",
          title: "Inspire"
        }
      ],
      miniVariant: false,
    };
  },
  mounted() {
    this.checkForSupport();
  },
  methods: {
    checkForSupport() {
      try {
        window.AudioContext =
          window.AudioContext ||
          window.webkitAudioContext ||
          window.mozAudioContext ||
          window.msAudioContext;
        navigator.getUserMedia =
          navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia ||
          navigator.msGetUserMedia;
        window.URL =
          window.URL || window.webkitURL || window.mozURL || window.msURL;
      } catch (e) {
        window.alert(
          "Your browser does not support WebAudio, try Google Chrome"
        );
      }
    }
  }
};
</script>
