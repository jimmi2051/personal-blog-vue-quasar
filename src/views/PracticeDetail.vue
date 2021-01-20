<template>
  <q-page>
    <PageTitle title="Practice" />
    <div class="practice">
      <q-card class="practice-card">
        <q-card-section>
          <div class="text-h6">Practice Test Detail</div>
          <div class="text-subtitle2">
            {{ store.data.title || "Unkown" }}
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions vertical v-if="!store.loading">
          <q-item
            clickable
            v-ripple
            v-for="module in store.data.modules"
            :key="module.id"
            :to="`/module/${module.id}`"
          >
            <q-item-section avatar>
              <q-avatar rounded color="info" text-color="white" icon="book" />
            </q-item-section>
            <q-item-section>
              {{ module.title }}
            </q-item-section>
            <q-item-section class="total-point">
              {{ module.point }}
              <q-icon name="star_border" color="yellow" />
            </q-item-section>
          </q-item>
        </q-card-actions>
        <q-card-actions vertical v-if="store.loading">
          <q-item>
            <q-inner-loading :showing="true">
              <q-spinner-gears size="50px" color="primary" />
            </q-inner-loading>
          </q-item>
        </q-card-actions>
        <q-card-actions style="width: 100%;">
          <q-item style="width: 100%;">
            <q-btn
              color="red"
              icon-right="send"
              label="Take The Test"
              style="width:100%"
            />
          </q-item>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
import PageTitle from "components/PageTitle.vue";
function mapStateToProps(state) {
  const userProfile = state.User.userProfile;
  const data = state.Practice.practice.data;

  return {
    userProfile,
    data,
    loading: state.Practice.practice.loading
  };
}
export default {
  components: {
    PageTitle
  },
  created: function() {
    const { params } = this.$route;
    if (!params.id) {
      this.$router.push("/");
    }
    this.handleGetPractice(params.id);
  },
  methods: {
    ...mapActions("Practice", ["getPractice"]),
    handleGetPractice(id) {
      let payload = {
        nextErr: err => {
          console.log("[ERROR] " + err);
        },
        nextSuccess: response => {
          if (response.error) {
            this.$q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: response.message
            });
            this.$router.push("/");
          }
          console.log("response", response);
        },
        id
      };
      this.getPractice(payload);
    }
  },
  meta: {
    // sets document title
    title: "Practice Detail Page",
    titleTemplate: title => `${title} - DefTnt Blog`
  },
  computed: {
    ...mapState({
      store: mapStateToProps
    })
  }
};
</script>
