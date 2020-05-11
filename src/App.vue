<template>
  <div id="app">
    <q-layout>
      <q-page-container v-if="!store.loading">
        <Header />
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
  },
  methods: {
    ...mapActions("Page", ["getListPage"])
  },
  computed: {
    ...mapState({
      store: mapStateToProps
    })
  }
};
</script>
