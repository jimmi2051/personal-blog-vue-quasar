
<template>
  <q-page padding>
    <div class="home">
      <ul id="example-1" v-if="!trainingList.loading">
        <li :key="training._id" v-for="training in trainingList.data">{{ training.name }}</li>
      </ul>
      <ul v-else>
        <li>Loading ....</li>
      </ul>
    </div>
  </q-page>
</template>

<script>
// // @ is an alias to /src
import { mapActions, mapState } from "vuex";
export default {
  name: "Home",
  created: function() {
    let payload = {
      id: "11",
      nextErr: err => {
        console.log(err);
      },
      nextSuccess: success => {
        console.log(success);
      }
    };
    this.getListTraining(payload);
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