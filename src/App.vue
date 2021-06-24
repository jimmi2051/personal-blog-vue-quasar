<template>
  <div id="app">
    <q-layout>
      <q-page-container>
        <Header :change="changeMode" v-if="isShow" />
        <router-view />
        <Footer v-if="isShow" />
      </q-page-container>
    </q-layout>
    <Chatbox v-if="isShow" />
  </div>
</template>

<style lang="scss"></style>

<script>
import Header from "layout/Header.vue";
import Footer from "layout/Footer.vue";
import Chatbox from "components/Chatbox.vue";
// import { mapActions, mapState } from "vuex";
// function mapStateToProps(state) {
//   const data = state.Page.healthCheck.description;
//   return {
//     loading: state.Page.healthCheck.loading,
//     description: data
//   };
// }
export default {
  data() {
    return {
      isShow: true,
      loading: false
    };
  },
  components: {
    Header,
    Footer,
    Chatbox
  },
  created: function() {
    // let payload = {
    //   nextErr: err => {
    //     console.log("[ERROR] ====>", err);
    //     this.$q.loading.hide();
    //   },
    //   nextSuccess: success => {
    //     console.log("[DEBUG] ====>", success.description);
    //     this.$q.loading.hide();
    //   }
    // };
    // this.healthCheck(payload);
    // this.$q.dark.set(false);
  },
  mounted() {
    this.$q.loading.hide();
  },
  methods: {
    // ...mapActions("Page", ["healthCheck"]),
    changeMode(value) {
      this.$q.dark.set(value);
    }
  },
  // computed: {
  //   ...mapState({
  //     store: mapStateToProps
  //   })
  // },
  watch: {
    "$q.dark.isActive"(val) {
      console.log(val ? "On dark mode" : "On light mode");
    },
    "$route.path"(to) {
      if (to === "/video-call") {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    }
  }
};
</script>
