<template>
  <div id="app">
    <q-layout>
      <q-page-container v-if="!store.loading">
        <Header :change="changeMode" />
        <router-view />
        <Footer />
      </q-page-container>
    </q-layout>
  </div>
</template>

<style lang="scss">
// @import "styles/styles.scss";
</style>

<script>
import Header from "layout/Header.vue";
import Footer from "layout/Footer.vue";
import { mapActions, mapState } from "vuex";
function mapStateToProps(state) {
  const data = state.Page.pages.data.pages ? state.Page.pages.data.pages : [];
  // if(data.length>0)
  // {

  // }
  return {
    loading: state.Page.pages.loading,
    pages: data
  };
}
export default {
  components: {
    Header,
    Footer
  },
  created: function() {
    // console.log("this>>>", this);
    this.$q.loading.show();
    let payload = {
      nextErr: err => {
        this.$q.loading.hide();
        console.log(err);
      },
      nextSuccess: success => {
        console.log("Debug ===>", success);
        this.$q.loading.hide();
      }
    };
    // this.getListTraining(payload);
    this.getListPage(payload);
    this.$q.dark.set(false);
  },
  methods: {
    ...mapActions("Page", ["getListPage"]),
    changeMode(value) {
      // console.log("valie ==>", value);
      // console.log("evt ==>", evt);
      this.$q.dark.set(value);
    }
  },
  computed: {
    ...mapState({
      store: mapStateToProps
    })
  },
  watch: {
    "$q.dark.isActive"(val) {
      console.log(val ? "On dark mode" : "On light mode");
    }
  }
};
</script>
