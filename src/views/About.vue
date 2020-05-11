<template>
  <q-page>
    <div class="about-us">
      <div class="section-1">
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-card-section class="col-7">
              <h3 class="text-h3">Hi, I'm Thanh Nguyen.</h3>
              <p class="text-body1">
                I'm a
                <span class="text-bold">full-stack developer.</span>
                I have more than a year of experience working with
                <span class="text-bold">ReactJS & Python DJango.</span>
              </p>

              <p class="text-body1">
                I will fit your company if you need a
                <span class="text-bold">dynamic</span> developer,
                <span class="text-bold">creative</span> and
                <span class="text-bold">well adapted</span> to the work
                environment.
              </p>
            </q-card-section>

            <q-img
              transition="fade"
              class="col-5"
              :src="require('@/assets/images/Aboutuspage/avatar.jpg')"
              spinner-color="white"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  }
};
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 1140px;
  margin: auto;
}
</style>
