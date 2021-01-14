<template>
  <q-page>
    <PageTitle title="Sign In" />
    <div class="signin">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="identifier"
          label="Username/Email (*)"
          hint="Username or Email"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Identifier is required.']"
          ref="identifier"
          name="email"
        />

        <q-input
          v-model="password"
          filled
          :type="isPwd ? 'password' : 'text'"
          hint="Password"
          label="Password (*)"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Password is required.']"
          ref="password"
          name="password"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <q-toggle v-model="accept" label="I'm not a bot" />

        <div class="text-center">
          <q-btn label="SIGN IN" type="submit" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import PageTitle from "components/PageTitle.vue";
import { mapActions, mapState } from "vuex";

function mapStateToProps(state) {
  const isLogin = state.User.userProfile.isLogin;
  return {
    isLogin
  };
}
export default {
  components: {
    PageTitle
  },
  created: function() {
    if (this.store.isLogin) {
      this.$router.push("/");
    }
  },
  meta: {
    // sets document title
    title: "Sign In",
    titleTemplate: title => `${title} - DefTnt Blog`
  },
  data() {
    return {
      accept: false,
      isPwd: true,
      password: "",
      identifier: ""
    };
  },
  methods: {
    ...mapActions("User", ["signIn"]),

    handleSignIn(identifier, password) {
      let payload = {
        nextErr: err => {
          this.$q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: JSON.stringify(err)
          });
        },
        nextSuccess: res => {
          if (res.jwt) {
            this.$q.notify({
              color: "green-4",
              textColor: "white",
              icon: "cloud_done",
              message: "Login successfully."
            });
            this.onReset();
            this.$refs.identifier.resetValidation();
            this.$refs.password.resetValidation();
            this.$router.push("/");
          } else {
            this.$q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: JSON.stringify(res)
            });
          }
        },
        identifier,
        password
      };
      this.signIn(payload);
    },

    onSubmit() {
      if (this.accept !== true) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "You need confirm you aren't a bot."
        });
      } else {
        // Login
        this.handleSignIn(this.identifier, this.password);
      }
    },
    onReset() {
      this.identifier = "";
      this.password = "";
      this.email = "";
      this.accept = false;
      this.isPwd = false;
    }
  },
  computed: {
    ...mapState({
      store: mapStateToProps
    })
  }
};
</script>
