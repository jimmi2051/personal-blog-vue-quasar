<template>
  <q-page>
    <PageTitle title="Practice" />
    <div class="practice">
      <q-card class="practice-card">
        <q-card-section>
          <div class="text-h6">Practice Test</div>
          <div class="text-subtitle2">by {{ store.userProfile.fullname }}</div>
        </q-card-section>

        <q-separator />

        <q-card-actions vertical>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar
                rounded
                color="primary"
                text-color="white"
                icon="style"
              />
            </q-item-section>

            <q-item-section>Practice 1</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar
                rounded
                color="primary"
                text-color="white"
                icon="style"
              />
            </q-item-section>

            <q-item-section>Practice 1</q-item-section>
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
  return {
    userProfile
  };
}
export default {
  components: {
    PageTitle
  },
  created: function() {
    // const { params } = this.$route;
    // if (!params.id) {
    //   this.$router.push("/");
    // }
  },
  methods: {
    ...mapActions("Message", ["getMessageList"])
  },
  meta: {
    // sets document title
    title: "Practice Page",
    titleTemplate: title => `${title} - DefTnt Blog`
  },
  computed: {
    ...mapState({
      store: mapStateToProps
    })
  }
};
</script>
