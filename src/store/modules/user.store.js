/* User.store.js */
import FetchApi from "utils/FetchApi";

const initialState = () => ({
  trainingList: [1, 2, 3]
});

// State object
const state = initialState();

// Getter functions
const getters = {
  getTrainingList(state) {
    return state.trainingList;
  }
};

// Actions
const actions = {
  getListTraining({ commit }) {
    const payload = {
      uri: "trainings"
    };
    FetchApi(payload).then(result => {
      commit("SET_TRAINING_LIST", result);
    });
  },
  reset({ commit }) {
    commit("RESET");
  }
};

// Mutations
const mutations = {
  RESET(state) {
    const newState = initialState();
    Object.keys(newState).forEach(key => {
      state[key] = newState[key];
    });
  },
  SET_TRAINING_LIST(state, data) {
    state.trainingList = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
