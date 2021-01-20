<template>
  <q-page>
    <PageTitle title="Practice" />
    <div class="practice">
      <q-card class="practice-card">
        <q-card-section>
          <div class="text-h6">Take The Test</div>
          <div class="text-subtitle2">
            Module: {{ store.data.title || "Unkown" }}
          </div>
        </q-card-section>

        <q-separator />
        <q-tabs
          v-model="tab"
          inline-label
          outside-arrows
          mobile-arrows
          class="bg-primary text-white shadow-2"
          v-if="!store.loading"
        >
          <q-tab
            :name="content.id"
            :label="' Part ' + (index + 1)"
            v-for="(content, index) in store.data.contents"
            :key="content.id"
          />
        </q-tabs>
        <q-tab-panels
          v-model="tab"
          animated
          v-for="(content, index) in store.data.contents"
          :key="index"
        >
          <q-tab-panel :name="content.id">
            <div v-for="(data, indexData) in content.data" :key="indexData">
              {{ indexData }}
              {{ data.question }}
            </div>
          </q-tab-panel>
        </q-tab-panels>
        <q-card-actions vertical v-if="store.loading">
          <q-item>
            <q-inner-loading :showing="true">
              <q-spinner-gears size="50px" color="primary" />
            </q-inner-loading>
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
  const data = state.Practice.module.data;

  return {
    userProfile,
    data,
    loading: state.Practice.module.loading
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
    this.handleGetModule(params.id);
  },
  methods: {
    ...mapActions("Practice", ["getModule"]),
    handleGetModule(id) {
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
        },
        id
      };
      this.getModule(payload);
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
  },
  data() {
    return {
      tab: "",
      subTab: ""
    };
  }
};
</script>
