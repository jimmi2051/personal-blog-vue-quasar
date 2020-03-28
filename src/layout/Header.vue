<template>
  <q-toolbar class="bg-black text-white shadow-2">
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
    <q-item to="/about" exact>
      <q-btn stretch flat label="About" />
    </q-item>
    <q-separator dark vertical />
    <q-item to="/works" exact>
      <q-btn stretch flat label="Works" />
    </q-item>
    <q-separator dark vertical />
    <q-item to="/contact" exact>
      <q-btn stretch flat label="Contact" />
    </q-item>
    <q-separator dark vertical />
    <q-item to="https://www.facebook.com/beatboxer.mrteo" exact>
      <i class="fab fa-facebook fa-2x" style="line-height:48px; height: 48px; text-align:center; min-width: 48px" />
    </q-item>
  </q-toolbar>
</template>
<script>
</script>
