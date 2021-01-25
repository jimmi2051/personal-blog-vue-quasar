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
  const data = state.Page.healthCheck.description;
  return {
    loading: state.Page.healthCheck.loading,
    description: data
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
        console.log("[ERROR] ====>", err);
        this.$q.loading.hide();
      },
      nextSuccess: success => {
        console.log("[DEBUG] ====>", success.description);
        this.$q.loading.hide();
      }
    };
    this.healthCheck(payload);

    this.$q.dark.set(false);
  },
  methods: {
    ...mapActions("Page", ["healthCheck"]),
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
