/* eslint-disable no-unused-vars */
import { LoadingBar } from "quasar";
import gql from "graphql-tag";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { IntrospectionFragmentMatcher } from "apollo-cache-inmemory";
import Vue from "vue";

const API_URL = process.env.VUE_APP_API_URL;
/* Tutorial update fragmentTypes
  Step 1: Edit file codegen.yml --> Change Endpoint GraphQL
  Step 2: Run script: yarn generate
*/
import introspectionQueryResultData from "./fragmentTypes.json";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const actionMiddleware = (action, store) => {
  LoadingBar.setDefaults({
    color: "light-blue-3",
    size: "3px",
    position: "top"
  });
  const {
    successType,
    beforeCallType,
    afterSuccess,
    errorType,
    afterError,
    payload
  } = action;
  LoadingBar.start();
  Vue.prototype.$q.loading.show();

  // Init ApploClient
  // HTTP connection to the API
  const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: `${API_URL}graphql`
  });

  // Cache implementation
  const cache = new InMemoryCache({ fragmentMatcher });

  // Create the apollo client
  const apolloClient = new ApolloClient({
    link: httpLink,
    cache
  });

  if (beforeCallType) {
    store.commit(beforeCallType);
  }
  const { query } = payload;
  apolloClient
    .query({
      // Query
      query: gql`
        ${query}
      `
    })
    .then(response => {
      // Result
      if (response.data) {
        if (successType) {
          store.commit(successType, response.data);
        }
        if (typeof afterSuccess === "function") {
          afterSuccess(response.data);
        }
      }
      LoadingBar.stop();
      Vue.prototype.$q.loading.hide();
    })
    .catch(error => {
      // Error
      /* 
        error: {
            message,
            graphQLErrors,
            networkError,
            extraInfo
        }
      */
      if (errorType) {
        store.commit(errorType, error);
      }
      if (typeof afterError === "function") {
        afterError(error);
      }
      LoadingBar.stop();
      Vue.prototype.$q.loading.hide();
    });
};

export default actionMiddleware;
