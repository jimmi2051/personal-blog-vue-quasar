import FetchApi from "utils/FetchApi";
import { LoadingBar } from "quasar";
import Vue from "vue";

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
    ...rest
  } = action;
  LoadingBar.start();
  Vue.prototype.$q.loading.show();
  if (beforeCallType) {
    store.commit(beforeCallType);
  }
  FetchApi(rest)
    .then(response => {
      if (response) {
        if (successType) {
          store.commit(successType, response);
        }
        if (typeof afterSuccess === "function") {
          afterSuccess(response);
        }
      } else {
        if (errorType) {
          store.commit(errorType, response);
        }
        if (typeof afterError === "function") {
          afterError(response);
        }
      }
      Vue.prototype.$q.loading.hide();
      LoadingBar.stop();
    })
    .catch(error => {
      Vue.prototype.$q.loading.hide();
      LoadingBar.stop();
      if (errorType) {
        store.commit(errorType, error);
        if (typeof afterError === "function") {
          afterError(error);
        }
      }
    });
};

export default actionMiddleware;
