<template>
  <div class="row q-pt-md">
    <div class="col-12">
      <div class="text-subtitle2 q-pb-sm q-pt-sm">
        Here is our latest projects. You'll love them!
      </div>
    </div>

    <!-- <div class="col-sm-4 q-pa-md"> -->
    <q-card class="col-xs-12 col-sm-12 col-md-4 col-lg-4 q-pa-md">
      <div class="thumbnail-video">
        <img
          :src="require('@/assets/images/Homepage/job-ai-lysis.jpg')"
          alt="company-1"
          class="thumbnail-video-image"
        />
      </div>
      <q-card-section>
        <div class="text-h6">Jobhopin - JobAI-Lysis - SAP Success Factors</div>
        <div class="text-subtitle2">
          Faster screening, Better decision-making with AI-powered Market
          Insights
        </div>
        <q-btn
          type="a"
          href="https://store.sap.com/dcp/en/product/display-0000060344_live_v1/JobAI-lysis%20-%20Mass%20CV%20Parser%20&%20Market%20Intelligence"
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

    <q-card class="col-xs-12 col-sm-12 col-md-4 col-lg-4 q-pa-md">
      <div class="thumbnail-video">
        <img
          :src="require('@/assets/images/Homepage/background-athena.png')"
          alt="company-3"
          class="thumbnail-video-image"
        />
      </div>
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
        >References
      </q-btn>
    </q-card>

    <!-- <div classs="col-sm-4 q-pa-md"> -->
    <q-card class="col-xs-12 col-sm-12 col-md-4 col-lg-4 q-pa-md">
      <div class="thumbnail-video">
        <img
          :src="require('@/assets/images/Homepage/background-ares.png')"
          alt="company-2"
          class="thumbnail-video-image"
        />
      </div>
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
  </div>
</template>
