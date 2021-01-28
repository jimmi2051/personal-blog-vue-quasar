import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./quasar";
import "./styles/_styles.scss";
import VueMarkdown from "vue-markdown";

Vue.config.productionTip = false;
Vue.use(VueMarkdown);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
