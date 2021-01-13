<template>
  <q-parallax class="page-title" :height="200" :speed="0.5">
    <template v-slot:media>
      <img
        :src="require('@/assets/images/background-index-2.jpg')"
        alt="background"
      />
    </template>

    <h1 class="text-h3 text-white text-center header-content">
      {{ title }}
    </h1>
  </q-parallax>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
};
</script>
