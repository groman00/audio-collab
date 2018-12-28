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
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>bubble_chart</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <router-link to="/tracks">Tracks</router-link>
            </v-list-tile-title>
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
      <v-btn icon to="/tracks/new">
        <v-icon>add</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
// import AudioRecorder from "./components/AudioRecorder";

export default {
  name: "App",
  // components: {
  //   AudioRecorder
  // },
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
      miniVariant: false
    };
  },
  created() {
    // this.checkForSupport();
  },
  methods: {
    // checkForSupport() {
    //   try {
    //     window.AudioContext =
    //       window.AudioContext ||
    //       window.webkitAudioContext ||
    //       window.mozAudioContext ||
    //       window.msAudioContext;
    //     // console.log('foo');
    //     // console.log(window.AudioContext);
    //     navigator.getUserMedia =
    //       navigator.getUserMedia ||
    //       navigator.webkitGetUserMedia ||
    //       navigator.mozGetUserMedia ||
    //       navigator.msGetUserMedia;
    //     window.URL =
    //       window.URL || window.webkitURL || window.mozURL || window.msURL;
    //   } catch (e) {
    //     window.alert(
    //       "Your browser does not support WebAudio, try Google Chrome"
    //     );
    //   }
    // }
  }
};
</script>
