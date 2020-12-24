<template>
  <q-parallax class="section1" :speed="0.5">
    <template v-slot:media>
      <img
        :src="require('@/assets/images/background-index-2.jpg')"
        alt="background"
      />
    </template>

    <template v-slot:content="scope">
      <div
        class="absolute column items-center section1-background"
        :style="{
          opacity: 0.45 + (1 - scope.percentScrolled) * 0.55,
          top: scope.percentScrolled * 60 + '%',
          left: 0,
          right: 0,
        }"
      >
        <h1
          class="text-h3 text-white text-center header-content"
          v-html="'Hi There, I Am Thanh.<br/> Software Engineer'"
        ></h1>
      </div>
    </template>
  </q-parallax>
</template>

<script>
// // @ is an alias to /src
import { mapState } from "vuex";
// import { isArray } from "lodash";
// import { findPage, findSection } from "utils/Helpers";
const API_URL = process.env.VUE_APP_API_URL;
// function mapStateToProps(state) {
//   let data = {};
//   const pages = state.Page.pages.data.pages;
//   if (pages && isArray(pages)) {
//     data = findPage(pages, "Home");
//   }
//   const section = findSection(data.sections, "Homesection1");
//   const sectionDetail = section.sectiondetail;
//   const componentDetail =
//     sectionDetail.components.length > 0 ? sectionDetail.components[0] : {};
//   return {
//     loading: state.Page.pages.loading,
//     section,
//     sectionDetail,
//     componentDetail,
//   };
// }
export default {
  name: "Homesection1",
  created: function () {},
  computed: {
    ...mapState({
      // store: mapStateToProps,
    }),
  },
  data() {
    return {
      API_URL,
    };
  },
};
</script>
