
<template>
  <div id="app">
    <q-layout>
      <q-page-container>
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

export default {
  components: {
    Header,
    Footer
  }
};
</script>