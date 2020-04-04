
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

    <!-- <q-page padding>
      <div class="home">
        <ul id="example-1" v-if="!trainingList.loading">
          <li :key="training._id" v-for="training in trainingList.data">{{ training.name }}</li>
        </ul>
        <ul v-else>
          <li>Loading ....</li>
        </ul>
      </div>
    </q-page>-->

    <!-- <div class="q-pa-md">
      <q-btn color="primary" @click="showLoading" label="Show Loading" />
    </div>
    <div class="q-pa-md">
      <q-btn color="purple" @click="showNotif" label="Show Notification" />
    </div>-->
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
import { QSpinnerGears } from "quasar";
import Homesection1 from "sections/Homepage/Homesection1";
import Homesection2 from "sections/Homepage/Homesection2";
import Homesection3 from "sections/Homepage/Homesection3";
import Homesection4 from "sections/Homepage/Homesection4";
import Homesection5 from "sections/Homepage/Homesection5";
import Homesection6 from "sections/Homepage/Homesection6";
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
    ]),
    showLoading() {
      /* This is for Codepen (using UMD) to work */
      const spinner =
        typeof QSpinnerGears !== "undefined"
          ? QSpinnerGears
          : Quasar.components.QSpinnerGears; // eslint-disable-line
      /* End of Codepen workaround */

      this.$q.loading.show({
        message: "First message. Gonna change it in 3 seconds..."
      });

      this.timer = setTimeout(() => {
        this.$q.loading.show({
          spinner,
          spinnerColor: "red",
          messageColor: "black",
          backgroundColor: "yellow",
          message: "Updated message"
        });

        this.timer = setTimeout(() => {
          this.$q.loading.hide();
          this.timer = void 0;
        }, 2000);
      }, 2000);
    },
    beforeDestroy() {
      if (this.timer !== void 0) {
        clearTimeout(this.timer);
        this.$q.loading.hide();
      }
    }
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