<template>
  <div class="fixed-top-custom fixed-top">
    <!-- Menu desktop -->
    <q-toolbar class="bg-black text-white shadow-2 gt-sm">
      <!-- <q-btn flat round dense icon="menu" class="q-mr-sm" /> -->
      <q-item to="/" exact>
        <q-img
          :src="require('@/assets/images/logo.png')"
          spinner-color="white"
          style="height: auto; max-width: 50px; width: 50px"
        />
      </q-item>
      <q-separator dark vertical inset />
      <q-item to="/" exact>
        <q-btn stretch flat label="NLT" />
      </q-item>

      <q-separator dark vertical />
      <q-item exact to="/blogs">
        <q-btn stretch flat label="Blogs" />
      </q-item>
      <q-separator dark vertical />
      <q-item exact to="/about">
        <q-btn stretch flat label="About" />
      </q-item>
      <q-separator dark vertical />
      <q-item exact to="/#work">
        <q-btn stretch flat label="Works" />
      </q-item>
      <q-separator dark vertical />
      <q-item exact to="/#contact">
        <q-btn stretch flat label="Contact" />
      </q-item>
      <q-separator dark vertical />
      <q-btn
        type="a"
        href="https://www.facebook.com/beatboxer.mrteo"
        no-shadow
        target="__blank"
      >
        <i
          class="fab fa-facebook fa-2x"
          style="line-height:48px; height: 48px; text-align:center; min-width: 48px"
        />
      </q-btn>
      <q-separator dark vertical />
      <q-btn
        type="a"
        href="https://www.instagram.com/deftnguyen/"
        no-shadow
        target="__blank"
      >
        <i
          class="fab fa-instagram-square fa-2x"
          style="line-height:48px; height: 48px; text-align:center; min-width: 48px"
        />
      </q-btn>
      <q-separator dark vertical />
      <q-space />
      <q-separator dark vertical />

      <q-item exact to="/signin" v-if="!store.userProfile.isLogin">
        <q-btn stretch flat label="Sign In" />
      </q-item>
      <q-separator dark vertical v-if="!store.userProfile.isLogin" />
      <q-item exact to="/signup" v-if="!store.userProfile.isLogin">
        <q-btn stretch flat label="Sign Up" />
      </q-item>
      <q-item v-if="store.userProfile.isLogin">
        <q-btn stretch @click="signOut" flat label="Sign Out" />
      </q-item>
      <q-separator dark vertical />
      <q-toggle v-model="value" @input="change" color="light-blue" />
    </q-toolbar>
    <!-- Menu Mobile -->
    <q-toolbar class="bg-black text-white shadow-2 lt-md">
      <q-item to="/" exact>
        <q-img
          :src="require('@/assets/images/logo.png')"
          spinner-color="white"
          style="height: auto; max-width: 50px; width: 50px"
        />
      </q-item>
      <q-separator dark vertical inset />
      <q-item to="/" exact>
        <q-btn stretch flat label="NLT" />
      </q-item>
      <q-space />
      <!-- <q-btn flat round dense icon="menu" class="q-mr-sm" /> -->
      <q-btn flat round dense icon="menu" class="q-mr-sm">
        <q-menu content-class="bg-black text-white" style="width: 280px;">
          <q-list class="text-center" dense style="min-width: 250px">
            <q-separator dark inset />
            <q-item clickable v-close-popup>
              <q-btn
                stretch
                flat
                to="/blogs"
                label="Blogs"
                style="margin-left:auto;margin-right:auto;"
              />
            </q-item>
            <q-separator dark inset />
            <q-item clickable v-close-popup>
              <q-btn
                stretch
                flat
                to="/about"
                label="About"
                style="margin-left:auto;margin-right:auto;"
              />
            </q-item>
            <q-separator dark inset />

            <q-item exact clickable>
              <q-btn
                stretch
                to="/#work"
                flat
                label="Works"
                style="margin-left:auto;margin-right:auto;"
              />
            </q-item>
            <q-separator dark inset />
            <q-item exact clickable>
              <q-btn
                stretch
                to="/#contact"
                flat
                label="Contact"
                style="margin-left:auto;margin-right:auto;"
              />
            </q-item>
            <q-separator dark inset />
            <q-item clickable v-close-popup v-if="!store.userProfile.isLogin">
              <q-btn
                stretch
                flat
                to="/signin"
                label="Sign In"
                style="margin-left:auto;margin-right:auto;"
              />
            </q-item>
            <q-separator dark inset v-if="!store.userProfile.isLogin" />
            <q-item clickable v-close-popup v-if="!store.userProfile.isLogin">
              <q-btn
                stretch
                flat
                to="/signup"
                label="Sign Up"
                style="margin-left:auto;margin-right:auto;"
              />
            </q-item>

            <q-item clickable v-close-popup v-if="store.userProfile.isLogin">
              <q-btn
                stretch
                flat
                @click="signOut"
                label="Sign Out"
                style="margin-left:auto;margin-right:auto;"
              />
            </q-item>

            <q-separator dark inset />
            <q-btn
              type="a"
              href="https://www.facebook.com/beatboxer.mrteo"
              no-shadow
              target="__blank"
            >
              <i
                class="fab fa-facebook fa-2x"
                style="line-height:48px; height: 48px; text-align:center; min-width: 48px"
              />
            </q-btn>
            <q-separator dark inset />
            <q-btn
              type="a"
              href="https://www.instagram.com/deftnguyen/"
              no-shadow
              target="__blank"
            >
              <i
                class="fab fa-instagram-square fa-2x"
                style="line-height:48px; height: 48px; text-align:center; min-width: 48px"
              />
            </q-btn>
          </q-list>
        </q-menu>
      </q-btn>
    </q-toolbar>
  </div>
</template>
<script>
import AuthStorage from "utils/AuthStorage";
import { mapActions, mapState } from "vuex";

function mapStateToProps(state) {
  const data = state.User.userProfile;
  return {
    userProfile: data
  };
}
export default {
  data() {
    return {
      value: false,
      AuthStorage
    };
  },
  methods: {
    ...mapActions("User", ["signOut"]),
    showNotif() {
      this.$q.notify({
        message: "Oops! Sorry, The feature is comming soon. ",
        color: "light-blue",
        icon: "announcement"
      });
    }
  },
  props: {
    change: {
      type: Function,
      required: true
    }
  },
  computed: {
    ...mapState({
      store: mapStateToProps
    })
  }
};
</script>
