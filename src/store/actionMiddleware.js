import FetchApi from "utils/FetchApi";

const actionMiddleware = (action, store) => {
  const {
    successType,
    beforeCallType,
    afterSuccess,
    errorType,
    afterError,
    ...rest
  } = action;
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
    })
    .catch(error => {
      if (errorType) {
        store.commit(errorType, error);
      }
    });
};

export default actionMiddleware;
