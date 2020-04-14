<template>
  <div>
    <q-toolbar class="bg-black text-white shadow-2 gt-sm">
      <!-- <q-btn flat round dense icon="menu" class="q-mr-sm" /> -->
      <q-item to="/" exact>
        <q-img
          :src="require('@/assets/images/logo.png')"
          spinner-color="white"
          style="height: auto; max-width: 50px; width: 50px"
        />
      </q-item>

      <!-- <img src="~statics/logo.png" alt="#" /> -->
      <q-separator dark vertical inset />
      <q-item to="/" exact>
        <q-btn stretch flat label="NLT" />
      </q-item>
      <q-space />

      <q-separator dark vertical />
      <q-item exact>
        <q-btn stretch @click="showNotif" flat label="About" />
      </q-item>
      <q-separator dark vertical />
      <q-item exact>
        <q-btn stretch @click="showNotif" flat label="Works" />
      </q-item>
      <q-separator dark vertical />
      <q-item exact>
        <q-btn stretch @click="showNotif" flat label="Contact" />
      </q-item>
      <q-separator dark vertical />
      <q-btn type="a" href="https://www.facebook.com/beatboxer.mrteo" no-shadow target="__blank">
        <i
          class="fab fa-facebook fa-2x"
          style="line-height:48px; height: 48px; text-align:center; min-width: 48px"
        />
      </q-btn>
      <q-separator dark vertical />
      <q-btn type="a" href="https://www.instagram.com/deftnguyen/" no-shadow target="__blank">
        <i
          class="fab fa-instagram-square fa-2x"
          style="line-height:48px; height: 48px; text-align:center; min-width: 48px"
        />
      </q-btn>
    </q-toolbar>
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
                @click="showNotif"
                label="About"
                style="margin-left:auto;margin-right:auto;"
              />
            </q-item>
            <q-separator dark inset />

            <q-item exact>
              <q-btn
                stretch
                @click="showNotif"
                flat
                label="Works"
                style="margin-left:auto;margin-right:auto;"
              />
            </q-item>
            <q-separator dark inset />
            <q-item exact>
              <q-btn
                stretch
                @click="showNotif"
                flat
                label="Contact"
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
            <q-btn type="a" href="https://www.instagram.com/deftnguyen/" no-shadow target="__blank">
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
export default {
  methods: {
    showNotif() {
      this.$q.notify({
        message: "Oops! Sorry, The feature is comming soon. ",
        color: "light-blue",
        icon: "announcement"
      });
    }
  }
};
</script>
