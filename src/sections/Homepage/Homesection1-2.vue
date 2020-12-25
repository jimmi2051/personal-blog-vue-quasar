<template>
  <div id="about-me">
    <h2 class="section--title">About me</h2>
    <q-card class="my-card" flat>
      <q-card-section horizontal class="wrap justify-center">
        <q-img
          style="height: 280px; max-width: 300px"
          class="col-xs-12 col-sm-12 col-md-5 col-lg-5"
          :src="require('@/assets/images/Homepage/profile.jpg')"
        />

        <q-card-section
          class="col-xs-12 col-sm-12 col-md-7 col-lg-7 text-summary"
        >
          <div class="text-overline text-orange-9">Summary</div>
          <div class="text-h5 q-mt-sm q-mb-xs">
            Creative, self-motivated, and independent engineer with two years of
            experience in the Software field in various positions fully involved
            in the Software Development Life Cycle.
          </div>
          <q-separator />
          <div class="text-h5 q-mt-sm q-mb-xs">
            Strong at Django, ReactJS and NodeJS.
          </div>
          <q-separator />
          <div class="text-h5 q-mt-sm q-mb-xs">
            Experience with Docker, AWS, CI/CD, Unit & Coverage Testing.
          </div>
          <q-separator />
          <div class="text-h5 q-mt-sm q-mb-xs">
            Familiar with Agile/Scrum.
          </div>
        </q-card-section>
      </q-card-section>

      <!-- <q-separator /> -->
    </q-card>
  </div>
</template>
