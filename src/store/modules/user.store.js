/* eslint-disable no-unused-vars */
/* User.store.js */
import actionMiddleware from "store/actionMiddleware";

const initialState = {
  trainingList: {
    data: [],
    loading: true
  }
};

// State object
const state = initialState;

// Getter functions
const getters = {
  getTrainingList(state) {
    return state.trainingList;
  }
};

// Actions
const actions = {
  getListTraining(store, payload) {
    const { nextErr, nextSuccess } = payload;
    const action = {
      beforeCallType: "GET_TRAINING_REQUEST",
      successType: "GET_TRAINING_SUCCESS",
      errorType: "GET_TRAINING_ERROR",
      afterSuccess: nextSuccess,
      afterError: nextErr,
      uri: "trainings"
    };
    actionMiddleware(action, store);
  },
  reset({ commit }) {
    commit("RESET");
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
  GET_TRAINING_REQUEST(state) {
    state.trainingList = initialState.trainingList;
  },
  GET_TRAINING_SUCCESS(state, data) {
    state.trainingList.data = data;
    state.trainingList.loading = false;
  },
  GET_TRAINING_ERROR(state, data) {
    state.trainingList = [];
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
