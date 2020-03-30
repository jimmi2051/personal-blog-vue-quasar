import Vue from "vue";

import "./styles/quasar.scss";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css";
import iconSet from "quasar/icon-set/fontawesome-v5";
import {
  Quasar,
  QPageContainer,
  QPage,
  QLayout,
  QHeader,
  QFooter,
  QToolbar,
  QBtn,
  QImg,
  QItem,
  QIcon,
  QAjaxBar,
  LoadingBar,
  QParallax
} from "quasar";
Vue.use(Quasar, {
  config: { LoadingBar },
  components: {
    /* not needed if importStrategy is not 'manual' */
    QPageContainer,
    QPage,
    QLayout,
    QHeader,
    QFooter,
    QToolbar,
    QBtn,
    QImg,
    QItem,
    QIcon,
    QAjaxBar,
    QParallax
  },
  directives: {},
  plugins: { LoadingBar },
  iconSet: iconSet
});
