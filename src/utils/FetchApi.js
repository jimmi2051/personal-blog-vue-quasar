/* eslint-disable no-empty */
/* eslint-disable require-yield */

import merge from "lodash/merge";

const API_URL = process.env.VUE_APP_API_URL;

export const fetching = (url, option) =>
  fetch(url, option)
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    })
    .catch(error => {
      throw error;
    });

export default function({ uri, params = {}, opt = {} }) {
  const defaultOption = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };

  if (!uri) {
    return;
  }

  const options = merge(defaultOption, opt);
  //   //set Token
  //   if (AuthStorage.loggedIn) {
  //     options.headers.Authorization = commondb
  //       ? `Bearer ${AuthStorage.tokenCommon}` //CommonDB
  //       : `Token ${AuthStorage.token}`; //FI
  //   }
  let url = `${API_URL}${uri}`;

  if (params && Object.keys(params).length > 0) {
    if (options && options.method === "GET") {
    } else {
      options.body = JSON.stringify(params);
    }
  }

  try {
    if (process.env.NODE_ENV === "development") {
      // console.log("==========> call " + url, ", options= ", options);
    }
    return fetch(url, options).then(response => {
      return response.json();
    });
  } catch (error) {
    return error;
  }
}
