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
      <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn> -->
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="record">
        <v-icon>mic</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <audio controls :src="audio"/>

    <!--
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
    -->
  </v-app>
</template>

<script>
import Recorder from './lib/Recorder.js';

export default {
  name: "App",
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
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
      recorder: null,
      recording: false,
      audio: null
    };
  },
  methods: {
    record() {
      // console.log(new Recorder());

      if (this.recorder) {
        this.recorder.stop();
        this.recorder.exportWAV((blob) => {
          console.log('callback', blob);
          const url = URL.createObjectURL(blob)
          this.audio = url;
        });
        return;
      }

      let context;
      try {
          window.AudioContext = window.AudioContext || window.webkitAudioContext  || window.mozAudioContext || window.msAudioContext;
          navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
          window.URL = window.URL || window.webkitURL || window.mozURL  || window.msURL;
          context = new window.AudioContext();
          context.createGain = context.createGain || context.createGainNode;
      } catch (e) {
          window.alert('Your browser does not support WebAudio, try Google Chrome');
      }

      if (navigator.getUserMedia) {
          navigator.getUserMedia({ audio: true }, (stream) => {
              var input = context.createMediaStreamSource(stream);
              this.recorder = new Recorder(input);
              this.recorder.record();
          }, function (e) {
              window.alert('Please enable your microphone to begin recording');
          });
      } else {
          window.alert('Your browser does not support recording, try Google Chrome');
      }
    }
  }
};
</script>
