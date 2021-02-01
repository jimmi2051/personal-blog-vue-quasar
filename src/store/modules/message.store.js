/* Example for call API using fetch */
/* eslint-disable no-unused-vars */
/* User.store.js */
import actionMiddleware from "store/actionMiddleware";
const initialState = {
  messageList: {
    data: [],
    loading: true
  }
};

// State object
const state = initialState;

// Getter functions
const getters = {
  getMessageList(state) {
    return state.messageList;
  }
};

// Actions
const actions = {
  /* Example Call API using Fetch */
  getMessageList(store, payload) {
    const { nextErr, nextSuccess, limit = 100 } = payload;
    const action = {
      beforeCallType: "GET_MESSAGE_REQUEST",
      successType: "GET_MESSAGE_SUCCESS",
      errorType: "GET_MESSAGE_ERROR",
      afterSuccess: nextSuccess,
      afterError: nextErr,
      uri: `messages?_sort=createdAt:DESC&_limit=${limit}`
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
  GET_MESSAGE_REQUEST(state) {
    state.messageList = initialState.messageList;
  },
  GET_MESSAGE_SUCCESS(state, data) {
    state.messageList.data = data;
    state.messageList.loading = false;
  },
  GET_MESSAGE_ERROR(state, data) {
    state.messageList = initialState.messageList;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
