
<template>
  <q-page>
    <Homesection1 />
    <Homesection2 />

    <div class="q-pa-md">
      <div class="q-gutter-y-md row">
        <div class="text-h3 col-12">Skills</div>
        <div class="text-h6 col-1" style="line-height:49px">ReactJS:</div>
        <q-rating
          v-model="ratingModel"
          size="3.5em"
          color="green-5"
          icon="star_border"
          icon-selected="star"
          class="col-11 text-left"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12 q-pa-md">
        <div class="text-h6">My Latest Projects</div>
        <div class="text-subtitle2">Here is our latest projects. You'll love them!</div>
      </div>

      <div class="col-4 q-pa-md">
        <q-card style="width:100% ">
          <img src="https://cdn.quasar.dev/img/mountains.jpg" />

          <q-card-section>
            <div class="text-h6">Our Changing Planet</div>
            <div class="text-subtitle2">by John Doe</div>
          </q-card-section>

          <!-- <q-card-section class="q-pt-none">
        
          </q-card-section>-->
        </q-card>
      </div>
      <div class="col-4 q-pa-md">
        <q-card style="width:100% ">
          <img src="https://cdn.quasar.dev/img/mountains.jpg" />

          <q-card-section>
            <div class="text-h6">Our Changing Planet</div>
            <div class="text-subtitle2">by John Doe</div>
          </q-card-section>

          <!-- <q-card-section class="q-pt-none">
        
          </q-card-section>-->
        </q-card>
      </div>
      <div class="col-4 q-pa-md">
        <q-card style="width:100% ">
          <img src="https://cdn.quasar.dev/img/mountains.jpg" />

          <q-card-section>
            <div class="text-h6">Our Changing Planet</div>
            <div class="text-subtitle2">by John Doe</div>
          </q-card-section>

          <!-- <q-card-section class="q-pt-none">
        
          </q-card-section>-->
        </q-card>
      </div>
    </div>
    <div class="q-pa-md">
      <div class="text-h6">Latest Activities</div>
      <q-carousel arrows swipeable animated v-model="slide" infinite>
        <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg">
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">Third stop</div>
            <div class="text-subtitle1">Famous Bridge</div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg">
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">Third stop</div>
            <div class="text-subtitle1">Famous Bridge</div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
        <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
      </q-carousel>
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
    <div class="q-pa-md">
      <div class="text-h6 q-pb-md">Latest Comments</div>
      <q-list style="margin-left:auto;margin-right:auto">
        <q-item>
          <q-item-section>
            <q-item-label>Single line item</q-item-label>
            <q-item-label
              caption
              lines="2"
            >Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
            <q-icon name="star" color="yellow" />
          </q-item-section>
        </q-item>

        <q-separator spaced inset />

        <q-item>
          <q-item-section>
            <q-item-label>Single line item</q-item-label>
            <q-item-label
              caption
            >Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>Voted!</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced inset />

        <q-item>
          <q-item-section>
            <q-item-label>Single line item</q-item-label>
            <q-item-label
              caption
            >Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-badge color="teal" label="10k" />
          </q-item-section>
        </q-item>

        <q-separator spaced inset />

        <q-item>
          <q-item-section>
            <q-item-label>Single line item</q-item-label>
            <q-item-label
              caption
            >Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>2 min ago</q-item-label>
            <div class="text-orange">
              <q-icon name="star" />
              <q-icon name="star" />
              <q-icon name="star" />
            </div>
          </q-item-section>
        </q-item>

        <q-separator spaced inset />

        <q-item>
          <q-item-section>
            <q-item-label>Single line item</q-item-label>
            <q-item-label
              caption
            >Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>meta</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
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
    Homesection2
  }
};
</script>