import Vue from "vue";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);
const cookie = Vue.$cookies;

const mandatory = () => {
  throw new Error("Storage Missing parameter!");
};

export default class Storage {
  constructor(name = mandatory()) {
    this.name = name;
  }

  set value(value) {
    const expires = new Date();
    expires.setDate(new Date().getDate() + 14);

    cookie.set(this.name, value, {
      path: "/",
      expires
    });
  }

  get value() {
    return cookie && cookie.get(this.name);
  }

  destroy = next => {
    cookie.remove(this.name, { path: "/" });
    if (typeof next === "function") {
      next();
    }
  };
}
