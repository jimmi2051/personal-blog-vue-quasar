<template>
  <q-parallax :speed="0.5">
    <template v-slot:media>
      <img :src="require('@/assets/images/background-index-2.jpg')" />
    </template>

    <template v-slot:content="scope">
      <div
        class="absolute column items-center"
        :style="{
            opacity: 0.45 + (1 - scope.percentScrolled) * 0.55,
            top: (scope.percentScrolled * 60) + '%',
            left: 0,
            right: 0
          }"
      >
        <!-- <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" style="width: 150px; height: 150px"> -->
        <div class="text-h3 text-white text-center header-content">
          Hi There, I Am Thanh.
          <br />Software Engineer
        </div>
        <!-- <div class="text-h6 text-grey-3 text-center">
            v{{ $q.version }}
        </div>-->
      </div>
    </template>
  </q-parallax>
</template>