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
  QParallax,
  QTimeline,
  QTimelineEntry,
  QRating,
  QCard,
  QCardSection,
  QCardActions,
  Loading,
  Notify
} from "quasar";
Vue.use(Quasar, {
  config: { LoadingBar, Notify },
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
    QParallax,
    QTimeline,
    QTimelineEntry,
    QRating,
    QCard,
    QCardSection,
    QCardActions
  },
  directives: {},
  plugins: { LoadingBar, Loading, Notify },
  iconSet: iconSet
});
