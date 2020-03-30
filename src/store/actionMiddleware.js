import FetchApi from "utils/FetchApi";
import { LoadingBar } from "quasar";

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
      LoadingBar.stop();
    })
    .catch(error => {
      LoadingBar.stop();
      if (errorType) {
        store.commit(errorType, error);
      }
    });
};

export default actionMiddleware;
