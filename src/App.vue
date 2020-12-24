<template>
  <div id="app">
    <q-layout>
      <q-page-container v-if="!store.loading">
        <Header :change="changeMode" />
        <router-view />
        <Footer />
      </q-page-container>
    </q-layout>
    <Chatbox />
  </div>
</template>

<style lang="scss"></style>

<script>
import Header from "layout/Header.vue";
import Footer from "layout/Footer.vue";
import Chatbox from "components/Chatbox.vue";
import { mapActions, mapState } from "vuex";
function mapStateToProps(state) {
  const data = state.Page.pages.data.pages ? state.Page.pages.data.pages : [];
  return {
    loading: state.Page.pages.loading,
    pages: data
  };
}
export default {
  components: {
    Header,
    Footer,
    Chatbox
  },
  created: function() {
    this.$q.loading.show();
    let payload = {
      nextErr: err => {
        this.$q.loading.hide();
        console.log(err);
      },
      nextSuccess: () => {
        this.$q.loading.hide();
      }
    };
    this.getListPage(payload);
    this.$q.dark.set(false);
  },
  methods: {
    ...mapActions("Page", ["getListPage"]),
    changeMode(value) {
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
