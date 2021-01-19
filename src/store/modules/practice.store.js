/* Example for call API using fetch */
/* eslint-disable no-unused-vars */
/* User.store.js */
import actionMiddleware from "store/actionMiddleware";
const initialState = {
  practices: {
    data: [],
    loading: true
  },
  practice: {
    data: {},
    loading: true
  }
};

// State object
const state = initialState;

// Getter functions
const getters = {
  _getPractices(state) {
    return state.practices;
  },
  _getPractice(state) {
    return state.practice;
  }
};

// Actions
const actions = {
  /* Example Call API using Fetch */
  getPractices(store, payload) {
    const { nextErr, nextSuccess } = payload;
    const action = {
      beforeCallType: "GET_PRACTICE_REQUEST",
      successType: "GET_PRACTICE_SUCCESS",
      errorType: "GET_PRACTICE_ERROR",
      afterSuccess: nextSuccess,
      afterError: nextErr,
      uri: "practices?_sort=createdAt:ASC"
    };
    actionMiddleware(action, store);
  },
  getPractice(store, payload) {
    const { nextErr, nextSuccess, id } = payload;
    const action = {
      beforeCallType: "GET_PRACTICE_SINGLE_REQUEST",
      successType: "GET_PRACTICE_SINGLE_SUCCESS",
      errorType: "GET_PRACTICE_SINGLE_ERROR",
      afterSuccess: nextSuccess,
      afterError: nextErr,
      uri: `practices/${id}`
    };
    actionMiddleware(action, store);
  }
};

// Mutations
const mutations = {
  RESET(state) {
    const newState = initialState;
    Object.keys(newState).forEach(key => {
      state[key] = newState[key];
    });
  },
  GET_PRACTICE_REQUEST(state) {
    state.practices = initialState.practices;
  },
  GET_PRACTICE_SUCCESS(state, data) {
    state.practices.data = data;
    state.practices.loading = false;
  },
  GET_PRACTICE_ERROR(state, data) {
    state.practices = initialState.practices;
  },
  GET_PRACTICE_SINGLE_REQUEST(state) {
    state.practices = initialState.practice;
  },
  GET_PRACTICE_SINGLE_SUCCESS(state, data) {
    state.practice.data = data;
    state.practice.loading = false;
  },
  GET_PRACTICE_SINGLE_ERROR(state, data) {
    state.practice = initialState.practice;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
