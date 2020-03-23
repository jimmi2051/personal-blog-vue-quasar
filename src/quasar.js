import Vue from "vue";

// import "./styles/quasar.scss";
import "@quasar/extras/material-icons/material-icons.css";
import { Quasar, Ripple } from "quasar";

Vue.use(Quasar, {
  config: {
    Ripple
  },
  components: {
    /* not needed if importStrategy is not 'manual' */
  },
  directives: {
    Ripple
  },
  plugins: {}
});
