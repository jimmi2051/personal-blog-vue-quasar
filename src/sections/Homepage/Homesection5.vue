<template>
  <div class="q-pt-md">
    <h2 class="section--title">My Latest Activities</h2>

    <q-carousel
      class="q-mt-md bg-grey-1 shadow-2 rounded-borders"
      arrows
      swipeable
      v-model="slide"
      infinite
    >
      <q-carousel-slide :name="1" class="column no-wrap no-padding">
        <div class="row fit justify-start items-center q-col-gutter no-wrap no-scroll">
          <q-img
            class="rounded-borders col-xs-12 col-sm-12 col-md-6 col-lg-6 full-height"
            :src="require('@/assets/images/Homepage/bo-cap-vang.jpg')"
          />
          <q-img
            class="rounded-borders col-xs-12 col-sm-12 col-md-6 col-lg-6 full-height"
            :src="require('@/assets/images/Homepage/bo-cap-vang-2.jpg')"
          />
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">Bo Cap Vang</div>
            <div class="text-subtitle1">Company Trip</div>
          </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide :name="2" class="column no-wrap no-padding">
        <div class="row fit justify-start items-center q-col-gutter no-wrap no-scroll">
          <q-img
            class="rounded-borders col-xs-12 col-sm-12 col-md-6 col-lg-6 full-height"
            :src="require('@/assets/images/Homepage/bo-cap-vang-3.jpg')"
          />
          <q-img
            class="rounded-borders col-xs-12 col-sm-12 col-md-6 col-lg-6 full-height"
            :src="require('@/assets/images/Homepage/bo-cap-vang-4.jpg')"
          />
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">Bo Cap Vang</div>
            <div class="text-subtitle1">Company Trip</div>
          </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide :name="3" class="column no-wrap no-padding">
        <div class="row fit justify-start items-center q-col-gutter no-wrap no-scroll">
          <q-img
            class="rounded-borders col-xs-12 col-sm-12 col-md-6 col-lg-6 full-height"
            :src="require('@/assets/images/Homepage/bo-cap-vang-5.jpg')"
          />
          <q-img
            class="rounded-borders col-xs-12 col-sm-12 col-md-6 col-lg-6 full-height"
            :src="require('@/assets/images/Homepage/bo-cap-vang-6.jpg')"
          />
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">Bo Cap Vang</div>
            <div class="text-subtitle1">Company Trip</div>
          </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="4" class="column no-wrap no-padding">
        <div class="row fit justify-start items-center q-col-gutter no-wrap no-scroll">
          <q-img
            class="rounded-borders col-xs-12 col-sm-12 col-md-6 col-lg-6 full-height"
            :src="require('@/assets/images/Homepage/company-trip.jpg')"
          />
          <q-img
            class="rounded-borders col-xs-12 col-sm-12 col-md-6 col-lg-6 full-height"
            :src="require('@/assets/images/Homepage/bo-cap-vang-2.jpg')"
          />
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">Ho Tram Beach</div>
            <div class="text-subtitle1">Company Trip</div>
          </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="5" class="column no-wrap no-padding">
        <div class="row fit justify-start items-center q-col-gutter no-wrap no-scroll">
          <q-img
            class="rounded-borders col-xs-12 col-sm-12 col-md-6 col-lg-6 full-height"
            :src="require('@/assets/images/Homepage/trung-thu.jpg')"
          />
          <q-img
            class="rounded-borders col-xs-12 col-sm-12 col-md-6 col-lg-6 full-height"
            :src="require('@/assets/images/Homepage/trung-thu-2.jpg')"
          />
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">Hoa Cau Office</div>
            <div class="text-subtitle1">Mid-Autumn Festival</div>
          </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="6" class="column no-wrap no-padding">
        <div class="row fit justify-start items-center q-col-gutter no-wrap no-scroll">
          <q-img
            class="rounded-borders col-xs-12 col-sm-12 col-md-6 col-lg-6 full-height"
            :src="require('@/assets/images/Homepage/vung-tau-101.jpg')"
          />
          <q-img
            class="rounded-borders col-xs-12 col-sm-12 col-md-6 col-lg-6 full-height"
            :src="require('@/assets/images/Homepage/vung-tau-101-2.jpg')"
          />
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">Vung Tau Beach</div>
            <div class="text-subtitle1">"Căn Phòng Xéo Xắc" Trip</div>
          </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="7" class="column no-wrap no-padding">
        <div class="row fit justify-start items-center q-col-gutter no-wrap no-scroll">
          <q-img
            class="rounded-borders col-xs-12 col-sm-12 col-md-6 col-lg-6 full-height"
            :src="require('@/assets/images/Homepage/vung-tau-101-3.jpg')"
          />
          <q-img
            class="rounded-borders col-xs-12 col-sm-12 col-md-6 col-lg-6 full-height"
            :src="require('@/assets/images/Homepage/vung-tau-101-4.jpg')"
          />
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">Vung Tau Beach</div>
            <div class="text-subtitle1">"Căn Phòng Xéo Xắc" Trip</div>
          </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="8" class="column no-wrap no-padding">
        <div class="row fit justify-start items-center q-col-gutter no-wrap no-scroll">
          <q-img
            class="rounded-borders col-xs-12 col-sm-12 col-md-6 col-lg-6 full-height"
            :src="require('@/assets/images/Homepage/headless-vung-tau-1.jpg')"
          />
          <q-img
            class="rounded-borders col-xs-12 col-sm-12 col-md-6 col-lg-6 full-height"
            :src="require('@/assets/images/Homepage/headless-vung-tau-2.jpg')"
          />
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">Vung Tau Beach</div>
            <div class="text-subtitle1">Headless Trip</div>
          </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="9" class="column no-wrap no-padding">
        <div class="row fit justify-start items-center q-col-gutter no-wrap no-scroll">
          <q-img
            class="rounded-borders col-xs-12 col-sm-12 col-md-6 col-lg-6 full-height"
            :src="require('@/assets/images/Homepage/headless-vung-tau-3.jpg')"
          />
          <q-img
            class="rounded-borders col-xs-12 col-sm-12 col-md-6 col-lg-6 full-height"
            :src="require('@/assets/images/Homepage/headless-vung-tau-4.jpg')"
          />
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">Vung Tau Beach</div>
            <div class="text-subtitle1">Headless Trip</div>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>
<style lang="scss" scoped>
.custom-caption {
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
<script>
export default {
  data() {
    return {
      slide: 1
    };
  }
};
</script>