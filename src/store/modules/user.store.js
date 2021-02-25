/* Example for call API using fetch */
/* eslint-disable no-unused-vars */
/* User.store.js */
import actionMiddleware from "store/actionMiddleware";
import AuthStorage from "utils/AuthStorage";
const initialState = {
  signup: {
    data: { jwt: "", user: {} },
    loading: true
  },
  userProfile: {
    token: AuthStorage?.token ?? "",
    user: AuthStorage?.user ?? {},
    isLogin: AuthStorage?.isLogin ?? false,
    id: AuthStorage?.id ?? "",
    fullname: AuthStorage?.fullname ?? ""
  },
  users: {
    data: [],
    loading: true
  }
};

// State object
const state = initialState;

// Getter functions
const getters = {
  getSignUp(state) {
    return state.signup;
  },
  getUserProfile(state) {
    return state.userProfile;
  },
  getUsers(state) {
    return state.users;
  }
};

// Actions
const actions = {
  /* Example Call API using Fetch */
  signUp(store, payload) {
    const {
      nextErr,
      nextSuccess,
      username,
      email,
      password,
      fullname = ""
    } = payload;
    const action = {
      beforeCallType: "SIGNUP_REQUEST",
      successType: "SIGNUP_SUCCESS",
      errorType: "SIGNUP_ERROR",
      afterSuccess: nextSuccess,
      afterError: nextErr,
      uri: "auth/local/register",
      opt: {
        method: "POST"
      },
      params: {
        username,
        email,
        password,
        fullname
      }
    };
    actionMiddleware(action, store);
  },
  signIn(store, payload) {
    const {
      nextErr,
      nextSuccess,

      identifier,
      password
    } = payload;
    const action = {
      beforeCallType: "SIGNIN_REQUEST",
      successType: "SIGNIN_SUCCESS",
      errorType: "SIGNIN_ERROR",
      afterSuccess: nextSuccess,
      afterError: nextErr,
      uri: "auth/local",
      opt: {
        method: "POST"
      },
      params: {
        identifier,
        password
      }
    };
    actionMiddleware(action, store);
  },
  getUsers(store, payload) {
    const { nextErr, nextSuccess, limit = -1 } = payload;
    const action = {
      beforeCallType: "GET_USERS_REQUEST",
      successType: "GET_USERS_SUCCESS",
      errorType: "GET_USERS_ERROR",
      afterSuccess: nextSuccess,
      afterError: nextErr,
      uri: `users?_sort=fullname:DESC&_limit=${limit}`
    };
    actionMiddleware(action, store);
  },
  signOut(store, payload) {
    store.commit("SIGNOUT_REQUEST");
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
  SIGNUP_REQUEST(state) {
    state.signup = initialState.signup;
  },
  SIGNUP_SUCCESS(state, data) {
    state.signup.data = data;
    state.signup.loading = false;
  },
  SIGNUP_ERROR(state, data) {
    state.signup.data = data;
    state.signup.loading = false;
  },
  SIGNIN_REQUEST(state) {
    state.userProfile = initialState.userProfile;
  },
  SIGNIN_SUCCESS(state, data) {
    if (data.jwt) {
      AuthStorage.value = {
        token: data.jwt,
        user: data.user
      };
      state.userProfile.token = data.jwt;
      state.userProfile.user = data.user;
      state.userProfile.id = data?.user?.id ?? "";
      state.userProfile.fullname = data?.user?.fullname ?? "";
      state.userProfile.isLogin = true;
    }
  },
  SIGNIN_ERROR(state, data) {
    state.userProfile.error = data;
  },
  SIGNOUT_REQUEST(state) {
    state.userProfile = {
      token: "",
      user: {},
      isLogin: false,
      id: "",
      fullname: ""
    };
    AuthStorage.value = {
      token: "",
      user: {},
      isLogin: false,
      id: "",
      fullname: ""
    };
  },
  GET_USERS_REQUEST(state) {
    state.users = initialState.users;
  },
  GET_USERS_SUCCESS(state, data) {
    state.users.data = data;
    state.users.loading = false;
  },
  GET_USERS_ERROR(state, data) {
    state.users.data = data;
    state.users.loading = false;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
