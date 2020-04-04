<template>
  <q-parallax class="section1" :speed="0.5">
    <template v-slot:media>
      <img :src="require('@/assets/images/background-index-2.jpg')" />
    </template>

    <template v-slot:content="scope">
      <div
        class="absolute column items-center section1-background"
        :style="{
            opacity: 0.45 + (1 - scope.percentScrolled) * 0.55,
            top: (scope.percentScrolled * 60) + '%',
            left: 0,
            right: 0
          }"
      >
        <div class="text-h3 text-white text-center header-content">
          Hi There, I Am Thanh.
          <br />Software Engineer
        </div>
      </div>
    </template>
  </q-parallax>
</template>