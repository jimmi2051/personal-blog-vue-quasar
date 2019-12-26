<template>
  <div id="app">
    <Header />
    <Footer />
    <router-view />
  </div>
</template>

<style lang="scss">
@import "styles/styles.scss";
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
