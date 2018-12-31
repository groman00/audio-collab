import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import Tracks from "../views/Tracks.vue";
import NewTrack from "../views/NewTrack.vue";
import Track from "../views/Track.vue";
import Users from "../views/Users.vue";

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
      path: "/tracks/new",
      name: "track-new",
      component: NewTrack
    },
    {
      path: "/tracks/:id",
      name: "track",
      component: Track,
      props: true
    },
    {
      path: "/users",
      name: "users",
      component: Users,
    }
  ]
});
