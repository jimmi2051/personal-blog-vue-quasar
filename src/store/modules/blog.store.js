/* Example for call API using fetch */
/* eslint-disable no-unused-vars */
/* User.store.js */
import actionMiddleware from "store/actionMiddleware";
import queryString from "query-string";
const initialState = {
  categories: {
    data: [],
    loading: true
  },
  blogs: {
    data: [],
    loading: true,
    count: 0
  },
  blog: {
    data: {},
    loading: true
  }
};

// State object
const state = initialState;

// Getter functions
const getters = {
  getCategories(state) {
    return state.categories;
  },
  getBlogs(state) {
    return state.blogs;
  },
  getBlog(state) {
    return state.blog;
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
  },
  getBlogs(store, payload) {
    const { nextErr, nextSuccess, params = {} } = payload;
    const action = {
      beforeCallType: "GET_BLOGS_REQUEST",
      successType: "GET_BLOGS_SUCCESS",
      errorType: "GET_BLOGS_ERROR",
      afterSuccess: nextSuccess,
      afterError: nextErr,
      uri: `blogs?_sort=createdAt:ASC&${queryString.stringify(params)}`
    };
    actionMiddleware(action, store);
  },
  getBlog(store, payload) {
    const { nextErr, nextSuccess, id } = payload;
    const action = {
      beforeCallType: "GET_BLOG_REQUEST",
      successType: "GET_BLOG_SUCCESS",
      errorType: "GET_BLOG_ERROR",
      afterSuccess: nextSuccess,
      afterError: nextErr,
      uri: `blogs/${id}`
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
  },
  GET_BLOGS_REQUEST(state) {
    state.blogs = initialState.blogs;
  },
  GET_BLOGS_SUCCESS(state, data) {
    state.blogs.data = data.data;
    state.blogs.count = data.count;
    state.blogs.loading = false;
  },
  GET_BLOGS_ERROR(state, data) {
    state.blogs.data = [];
    state.blogs.loading = false;
    state.blogs.count = 0;
  },
  GET_BLOG_REQUEST(state) {
    state.blog = initialState.blog;
  },
  GET_BLOG_SUCCESS(state, data) {
    state.blog.data = { ...data };
    state.blog.loading = false;
  },
  GET_BLOG_ERROR(state, data) {
    state.blog.data = {};
    state.blog.loading = false;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
