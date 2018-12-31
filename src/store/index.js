import Vue from "vue";
import Vuex from "vuex";
import tracks from "./modules/tracks";
import users from "./modules/users";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    tracks,
    users
  },
  state: {},
  mutations: {},
  actions: {}
});
