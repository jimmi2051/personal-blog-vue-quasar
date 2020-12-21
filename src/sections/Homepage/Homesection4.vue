<template>
  <div class="row q-pt-md">
    <div class="col-12">
      <h2 class="section--title">My Latest Projects</h2>
      <div class="text-subtitle2 q-pb-sm q-pt-sm">
        Here is our latest projects. You'll love them!
      </div>
    </div>

    <q-card class="col-xs-12 col-sm-12 col-md-4 col-lg-4 q-pa-md">
      <img
        :src="require('@/assets/images/Homepage/background-athena.png')"
        alt="company-3"
      />
      <q-card-section>
        <div class="text-h6">
          Synopsis Solutions - ATHENA <br />(BE-Developer)
        </div>
        <div class="text-subtitle2">
          Transaction Monitoring AML / CTF Compliance
        </div>
      </q-card-section>
      <q-btn
        type="a"
        href="https://www.cynopsis-solutions.com/athena"
        no-shadow
        target="__blank"
        class="q-mt-md"
        >References
      </q-btn>
    </q-card>

    <!-- <div classs="col-sm-4 q-pa-md"> -->
    <q-card class="col-xs-12 col-sm-12 col-md-4 col-lg-4 q-pa-md">
      <img
        :src="require('@/assets/images/Homepage/background-ares.png')"
        alt="company-2"
      />

      <q-card-section>
        <div class="text-h6">Synopsis Solutions - ARES <br />(FAC-OCR)</div>
        <div class="text-subtitle2">
          Identity Verification with Ease and Efficiency
        </div>
        <q-btn
          type="a"
          href="https://www.cynopsis-solutions.com/ares"
          no-shadow
          target="__blank"
          class="q-mt-md"
          >References
        </q-btn>
      </q-card-section>

      <!-- <q-card-section class="q-pt-none">
      </q-card-section>-->
    </q-card>
    <!-- </div> -->
    <!-- <div class="col-sm-4 q-pa-md"> -->
    <q-card class="col-xs-12 col-sm-12 col-md-4 col-lg-4 q-pa-md">
      <img
        :src="require('@/assets/images/Homepage/background-h3zoom.jpg')"
        alt="company-1"
      />

      <q-card-section>
        <div class="text-h6">H3Zoom - Facade Inspector</div>
        <div class="text-subtitle2">
          Automating and Digitizing Building Facade Inspections
        </div>
        <q-btn
          type="a"
          href="https://www.h3zoom.ai/facade-inspector"
          no-shadow
          target="__blank"
          class="q-mt-md"
          >References
        </q-btn>
      </q-card-section>

      <!-- <q-card-section class="q-pt-none">
        
      </q-card-section>-->
    </q-card>
    <!-- </div> -->
  </div>
</template>
