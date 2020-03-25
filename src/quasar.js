import Vue from "vue";

// import "./styles/quasar.scss";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/roboto-font/roboto-font.css";
import {
  Quasar,
  Ripple,
  QBtn,
  QIcon,
  Notify,
  BottomSheet,
  QToolbar,
  QToolbarTitle,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QPageContainer,
  QPage,
  QDrawer,
  QHeader,
  QLayout,
  Dialog,
  QDialog
} from "quasar";

Vue.use(Quasar, {
  config: {
    Ripple
  },
  components: {
    /* not needed if importStrategy is not 'manual' */
    QBtn,
    QIcon,
    QLayout,
    QToolbar,
    QToolbarTitle,
    QHeader,
    QDrawer,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QPage,
    QPageContainer,

    QDialog
  },
  directives: {
    Ripple
  },
  plugins: { Notify, BottomSheet, Dialog }
});
