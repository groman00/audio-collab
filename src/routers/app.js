import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import Tracks from "../views/Tracks.vue";
import Track from "../views/Track.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/tracks",
      name: "tracks",
      component: Tracks
    },
    {
      path: "/tracks/:id",
      name: "track",
      component: Track,
      props: true
    }
  ]
});
