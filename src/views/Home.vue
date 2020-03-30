
<template>
  <div>
    <q-parallax :height="600" :speed="0.5">
      <template v-slot:media>
        <img :src="require('@/assets/images/background-index.jpg')" />
      </template>

      <template v-slot:content="scope">
        <div
          class="absolute column items-center"
          :style="{
            opacity: 0.45 + (1 - scope.percentScrolled) * 0.55,
            top: (scope.percentScrolled * 60) + '%',
            left: 0,
            right: 0
          }"
        >
          <!-- <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" style="width: 150px; height: 150px"> -->
          <div class="text-h3 text-black text-center">
            Hi There, I Am Thanh.
            <br />Software Engineer
          </div>
          <!-- <div class="text-h6 text-grey-3 text-center">
            v{{ $q.version }}
          </div>-->
        </div>
      </template>
    </q-parallax>
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
  </div>
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