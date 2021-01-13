<template>
  <q-page>
    <PageTitle title="Sign Up" />
    <div class="signup">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="username"
          label="Username (*)"
          hint="Username"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Username is required.']"
          ref="username"
        />
        <q-input
          filled
          v-model="email"
          label="Email (*)"
          hint="E-mail"
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || 'Email is required.',
            isValidEmail
          ]"
          ref="email"
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
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <q-input
          v-model="confirmPassword"
          filled
          :type="isConPwd ? 'password' : 'text'"
          hint="Confirm Password"
          label="Confirm Password (*)"
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || 'Confirm password is required.',
            val =>
              (val && val.length > 0 && val === password) ||
              'Password is not match.'
          ]"
          ref="confirmpassword"
        >
          <template v-slot:append>
            <q-icon
              :name="isConPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isConPwd = !isConPwd"
            />
          </template>
        </q-input>
        <q-input
          filled
          v-model="fullname"
          label="Name display"
          hint="Your full name"
          ref="fullname"
        />

        <q-toggle v-model="accept" label="I'm not a bot" />

        <div class="text-center">
          <q-btn label="SIGN UP" type="submit" color="primary" />
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
  const data = state.User.signup.data;
  const isLogin = state.User.userProfile.isLogin;
  return {
    loading: state.User.signup.loading,
    data: data,
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
    title: "Sign Up",
    titleTemplate: title => `${title} - DefTnt Blog`
  },
  data() {
    return {
      email: null,
      accept: false,
      confirmPassword: null,
      isPwd: true,
      isConPwd: true,
      password: "",
      fullname: "",
      username: ""
    };
  },
  methods: {
    ...mapActions("User", ["signUp"]),

    handleSignUp(email, username, password, fullname) {
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
              message: "Register successfully."
            });
            this.onReset();
            this.$refs.email.resetValidation();
            this.$refs.username.resetValidation();
            this.$refs.password.resetValidation();
            this.$refs.confirmpassword.resetValidation();
          } else {
            this.$q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: JSON.stringify(res)
            });
          }
        },
        email,
        username,
        password,
        fullname
      };
      this.signUp(payload);
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
        this.handleSignUp(
          this.email,
          this.username,
          this.password,
          this.fullname
        );
      }
    },
    isValidEmail(val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || "Invalid email";
    },
    onReset() {
      this.username = "";
      this.fullname = "";
      this.password = "";
      this.confirmPassword = "";
      this.email = "";
      this.accept = false;
      this.isPwd = false;
      this.isConPwd = false;
    }
  },
  computed: {
    ...mapState({
      store: mapStateToProps
    })
  }
};
</script>
