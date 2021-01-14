<template>
  <q-page>
    <div class="blog-detail">Blog {{ this.$route.params.id }}</div>
  </q-page>
</template>

<script>
export default {
  created: function() {
    const { params } = this.$route;
    if (!params.id) {
      this.$router.push("/");
    }
  },
  meta: {
    // sets document title
    title: "Blog Detail",
    titleTemplate: title => `${title} - DefTnt Blog`
  }
};
</script>
