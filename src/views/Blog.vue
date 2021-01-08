<template>
  <q-page>
    <div class="blog-detail">Blog {{ this.$route.params.id }}</div>
  </q-page>
</template>

<script>
export default {
  created: function() {
    console.log("this", this);
    const { params } = this.$route;
    if (!params.id) {
      console.log(this.$route);
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
