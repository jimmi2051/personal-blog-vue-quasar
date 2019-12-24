<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <ul id="example-1">
      <li v-bind:key="training._id" v-for="training in trainingList">
        {{ training.name }}
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src

import HelloWorld from "@/components/HelloWorld.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  created: function() {
    console.log(1);
    console.log("Enviroment", process.env);
    this.getListTraining();
    // alert(1);
    // console.log(this.getListTraining());
    // this.getListTraining();
    // this.$store.action.getListTraining();
  },
  methods: {
    ...mapActions("User", [
      "getListTraining" // map `this.increment()` to `this.$store.dispatch('increment')`
    ])
  },
  computed: {
    ...mapState("User", ["trainingList"])
  }
};
</script>
