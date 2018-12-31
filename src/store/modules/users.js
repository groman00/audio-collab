// import api from "../../lib/api";

/**
 * Mutation Types
 */
const SET_ACTIVE_USER = `SET_ACTIVE_USER`;

/**
 * Initial State
 */
const state = {
  activeUser: null,
};

/**
 * Getters
 */
const getters = {
  activeUser: state => state.activeUser,
};

/**
 * Actions
 */
const actions = {
  setActiveUser({ commit }, user) {
    commit(SET_ACTIVE_USER, user);
  }
};

/**
 * Mutations
 */
const mutations = {
  [SET_ACTIVE_USER](state, user) {
    state.activeUser = user;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
