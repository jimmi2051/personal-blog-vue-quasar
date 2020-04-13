<template>
  <q-page>
    <Homesection1 />
    <div class="home-page">
      <Homesection2 />
      <Homesection3 />
      <Homesection4 />
      <Homesection5 />
      <Homesection6 />
    </div>
  </q-page>
</template>

<script>
// // @ is an alias to /src
import { mapState } from "vuex";
import { isArray } from "lodash";
import { findPage } from "utils/Helpers";
import Homesection1 from "sections/Homepage/Homesection1";
import Homesection2 from "sections/Homepage/Homesection2";
import Homesection3 from "sections/Homepage/Homesection3";
import Homesection4 from "sections/Homepage/Homesection4";
import Homesection5 from "sections/Homepage/Homesection5";
import Homesection6 from "sections/Homepage/Homesection6";
function mapStateToProps(state) {
  let data = {};
  const pages = state.Page.pages.data.pages;
  if (pages && isArray(pages)) {
    data = findPage(pages, "Home");
  }
  return {
    loading: state.Page.pages.loading,
    homePage: data
  };
}
export default {
  name: "Home",
  created: function() {},
  computed: {
    ...mapState({
      store: mapStateToProps
    })
  },
  data() {
    return {
      ratingModel: 3,
      slide: 1
    };
  },
  components: {
    Homesection1,
    Homesection2,
    Homesection3,
    Homesection4,
    Homesection5,
    Homesection6
  }
};
</script>
