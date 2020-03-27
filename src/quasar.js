import Vue from "vue";

import "./styles/quasar.scss";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/roboto-font/roboto-font.css";
import {
  Quasar,
  QPageContainer,
  QPage,
  QLayout,
  QHeader,
  QFooter,
  QToolbar,
  QBtn,
  QImg
} from "quasar";
Vue.use(Quasar, {
  config: {},
  components: {
    /* not needed if importStrategy is not 'manual' */
    QPageContainer,
    QPage,
    QLayout,
    QHeader,
    QFooter,
    QToolbar,
    QBtn,
    QImg
  },
  directives: {},
  plugins: {}
});
