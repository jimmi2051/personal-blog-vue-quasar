/* Example for call API using fetch */
/* eslint-disable no-unused-vars */
/* User.store.js */
import actionMiddleware from "store/actionMiddleware";
import queryString from "query-string";
const initialState = {
  categories: {
    data: [],
    loading: true
  }
};

// State object
const state = initialState;

// Getter functions
const getters = {
  getCategories(state) {
    return state.categories;
  }
};

// Actions
const actions = {
  /* Example Call API using Fetch */
  getCategories(store, payload) {
    const { nextErr, nextSuccess, params = {} } = payload;
    const action = {
      beforeCallType: "GET_CATEGORIES_REQUEST",
      successType: "GET_CATEGORIES_SUCCESS",
      errorType: "GET_CATEGORIES_ERROR",
      afterSuccess: nextSuccess,
      afterError: nextErr,
      uri: `categories?_sort=createdAt:ASC&${queryString.stringify(params)}`
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
  GET_CATEGORIES_REQUEST(state) {
    state.categories = initialState.categories;
  },
  GET_CATEGORIES_SUCCESS(state, data) {
    state.categories.data = data;
    state.categories.loading = false;
  },
  GET_CATEGORIES_ERROR(state, data) {
    state.categories = initialState.categories;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
