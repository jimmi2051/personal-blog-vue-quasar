<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="@/assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <ul id="example-1" v-if="!trainingList.loading">
      <li v-bind:key="training._id" v-for="training in trainingList.data">
        {{ training.name }}
      </li>
    </ul>
    <ul v-else>
      <li>Loading ....</li>
    </ul> -->
  </div>
</template>

<script>
// // @ is an alias to /src

// import HelloWorld from "@/components/HelloWorld.vue";
// import { mapActions, mapState } from "vuex";
// export default {
//   name: "home",
//   components: {
//     HelloWorld
//   },
//   created: function() {
//     let payload = {
//       id: "11",
//       nextErr: err => {
//         console.log(err);
//       },
//       nextSuccess: success => {
//         console.log(success);
//       }
//     };
//     this.getListTraining(payload);
//   },
//   methods: {
//     ...mapActions("User", [
//       "getListTraining" // map `this.increment()` to `this.$store.dispatch('increment')`
//     ])
//   },
//   computed: {
//     ...mapState("User", ["trainingList"])
//   }
// };
</script>
