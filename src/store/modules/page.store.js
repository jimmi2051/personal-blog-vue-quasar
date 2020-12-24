/* eslint-disable no-unused-vars */
/* Page.store.js */
import graphQLMiddleware from "store/graphQLMiddleware";
const initialState = {
  pages: {
    data: [],
    loading: true
  }
};

// State object
const state = initialState;

// Getter functions
const getters = {
  getPages(state) {
    return state.pages;
  }
};

// Actions
const actions = {
  getListPage(store, payload) {
    const { nextErr, nextSuccess } = payload;
    const action = {
      beforeCallType: "GET_PAGES_REQUEST",
      successType: "GET_PAGES_SUCCESS",
      errorType: "GET_PAGES_ERROR",
      afterSuccess: nextSuccess,
      afterError: nextErr,
      payload: {
        query: `{
            pages {
              pageName
              sections {
                sectionName
                sectiondetail {
                  sectionName
                  components {
                    ... on ComponentQuasarQParallax {
                      title
                      background {
                        name
                        url
                      }
                    }
                    ... on ComponentQuasarQTimeline {
                      title
                      listentry {
                        title
                        description
                        timeline
                        icon {
                          name
                          url
                        }
                      }
                    }
                    ... on ComponentQuasarQListLinearProgress {
                      title
                      listprogress {
                        title
                        value
                      }
                    }
                    ... on ComponentQuasarQCard {
                      cards {
                        title
                        subtitle
                        reference
                        background {
                          name
                          url
                        }
                      }
                    }
                    ... on ComponentQuasarQContact {
                      contacts {
                        iconfa
                        urlContact
                        displayContact
                      }
                    }
                    ... on ComponentQuasarQSlide {
                      slides {
                        title
                        subtitle
                        leftImage {
                          url
                          name
                        }
                        rightImage {
                          url
                          name
                        }
                      }
                    }
                  }
                }
              }
            }
          }
         `
      }
    };
    graphQLMiddleware(action, store);
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
  GET_PAGES_REQUEST(state) {
    state.pages = initialState.pages;
  },
  GET_PAGES_SUCCESS(state, data) {
    state.pages.data = data;
    state.pages.loading = false;
  },
  GET_PAGES_ERROR(state, data) {
    state.pages.data = [];
    state.pages.loading = false;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
