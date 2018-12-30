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

const REQUEST_TRACK = "REQUEST_TRACK";
const RECEIVE_TRACK = "RECEIVE_TRACK";
const RECEIVE_TRACK_FAILURE = "RECEIVE_TRACK_FAILURE";

/**
 * Initial State
 */
const state = {
  items: [],
  status: 0,
  activeTrack: null,
  newTrack: null,
};

/**
 * Getters
 */
const getters = {
  trackItems: state => state.items,
  activeTrack: state => state.activeTrack,
  newTrack: state => state.newTrack,
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
  createTrack({ commit }, newTrack, config) {
    commit(CREATE_TRACK);
    api
      .post("tracks", {}, newTrack, config)
      .then(track => commit(TRACK_CREATED, track))
      .catch(e => commit(TRACK_CREATED_FAILURE, e));
  },
  getTrack({ commit }, id) {
    commit(REQUEST_TRACK);
    api
      .get("track", { id })
      .then(track => commit(RECEIVE_TRACK, track))
      .catch(e => commit(RECEIVE_TRACK_FAILURE, e));
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
    state.newTrack = track;
    state.items.push(track);
    state.status = 1;
  },
  [TRACK_CREATED_FAILURE](state, e) {
    console.log("TRACK_CREATED_FAILURE", e);
    state.status = 2;
  },
  [REQUEST_TRACK](state) {},
  [RECEIVE_TRACK](state, track) {
    state.activeTrack = track;
  },
  [RECEIVE_TRACK_FAILURE](state, e) {}
};

export default {
  state,
  getters,
  actions,
  mutations
};
