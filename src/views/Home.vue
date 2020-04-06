
<template>
  <q-page>
    <Homesection1 />
    <div class="home-page">
      <Homesection2 />
      <Homesection3 />
      <Homesection4 />
      <Homesection5 />
      <Homesection6 />
    </div>
  </q-page>
</template>
<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)
</style>

<script>
// // @ is an alias to /src
import { mapActions, mapState } from "vuex";
import Homesection1 from "sections/Homepage/Homesection1";
import Homesection2 from "sections/Homepage/Homesection2";
import Homesection3 from "sections/Homepage/Homesection3";
import Homesection4 from "sections/Homepage/Homesection4";
import Homesection5 from "sections/Homepage/Homesection5";
import Homesection6 from "sections/Homepage/Homesection6";
export default {
  name: "Home",
  created: function() {},
  methods: {
    ...mapActions("User", [
      "getListTraining" // map `this.increment()` to `this.$store.dispatch('increment')`
    ])
  },
  computed: {
    ...mapState("User", ["trainingList"])
  },
  data() {
    return {
      ratingModel: 3,
      slide: 1
    };
  },
  components: {
    Homesection1,
    Homesection2,
    Homesection3,
    Homesection4,
    Homesection5,
    Homesection6
  }
};
</script>