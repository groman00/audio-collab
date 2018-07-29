// import * as types from '../mutation-types';
// import statuses from '../status-types';
import api from "../../lib/api";

/**
 * Mutation Types
 */
const REQUEST_TRACKS = "REQUEST_TRACKS";
const RECEIVE_TRACKS = "RECEIVE_TRACKS";
const RECEIVE_TRACKS_FAILURE = "RECEIVE_TRACKS_FAILURE";

const CREATE_TRACK = "CREATE_TRACK";
const TRACK_CREATED = "TRACK_CREATED";
const TRACK_CREATED_FAILURE = "TRACK_CREATED_FAILURE";

/**
 * Initial State
 */
const state = {
  items: [],
  status: 0,
  activeTrack: null
};

/**
 * Getters
 */
const getters = {
  trackItems: state => state.items
};

/**
 * Actions
 */
const actions = {
  getTrackItems({ commit }) {
    commit(REQUEST_TRACKS);
    api
      .get("tracks")
      .then(tracks => commit(RECEIVE_TRACKS, tracks))
      .catch(e => commit(RECEIVE_TRACKS_FAILURE, e));
  },
  createTrack({ commit }) {
    commit(CREATE_TRACK);
    api
      .post("tracks")
      .then(track => commit(TRACK_CREATED, track))
      .catch(e => commit(TRACK_CREATED_FAILURE, e));
  }
};

/**
 * Mutations
 */
const mutations = {
  [REQUEST_TRACKS](state) {
    state.status = 0;
  },
  [RECEIVE_TRACKS](state, trackItems) {
    state.items = trackItems;
    state.status = 1;
  },
  [RECEIVE_TRACKS_FAILURE](state, e) {
    console.log("RECEIVE_TRACKS_FAILURE", e);
    state.status = 2;
  },
  [CREATE_TRACK](state) {
    state.status = 0;
  },
  [TRACK_CREATED](state, track) {
    // state.activeTrack = track;
    state.items.push(track);
    state.status = 1;
  },
  [TRACK_CREATED_FAILURE](state, e) {
    console.log("TRACK_CREATED_FAILURE", e);
    state.status = 2;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
