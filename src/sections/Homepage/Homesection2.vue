<template>
  <div id="work">
    <h2 class="section--title">My Experience</h2>
    <q-timeline color="secondary">
      <q-timeline-entry heading>From 2018 to Now</q-timeline-entry>
      <q-timeline-entry
        title="JOBHOPIN"
        subtitle="Mar 1, 2022 - July 10, 2022"
        :avatar="require('@/assets/images/Homepage/jobhopin-logo.png')"
      >
        <div clas="text-body-1">
          <span class="text-weight-bold">Position</span>: Backend Engineer
        </div>
        <div clas="text-body-1">
          <span class="text-weight-bold">Main job</span>: Develop and contribute
          new features to our platform. Analyst and design workflow diagram,
          database, wireframe. Develop and contribute a product
          <b>JobAI-Lysis</b>
          that is a collaboration with SAP SuccessFactors.
        </div>
        <div clas="text-body-1">
          <span class="text-weight-bold">Technology</span>: Django, DRF, Celery,
          MySQL, Docker, Docker-compose, ReactJS and AWS Services.
        </div>
      </q-timeline-entry>

      <q-timeline-entry
        title="KYANON DIGITAL"
        subtitle="Feb 2, 2019 - Feb 28, 2021"
        :avatar="require('@/assets/images/Homepage/kyanon-logo.png')"
      >
        <div clas="text-body-1">
          <span class="text-weight-bold">Position</span>: Junior Full-Stack
        </div>
        <div clas="text-body-1">
          <span class="text-weight-bold">Main job</span>: Working at Hydra Squad
          | Develop Front-End using ReactJS & Develop Back-End using Django |
          Develop a part Microservices using Django & Docker & Docker-Compose.
          Use additional 3rd party services such as AWS, Google.
        </div>
        <div clas="text-body-1">
          <span class="text-weight-bold">Technology</span>: ReactJS
          (Javascript), Django (Python), Quasar (Vue), Strapi (NodeJS)
        </div>
      </q-timeline-entry>

      <q-timeline-entry
        title="SAPO TECHNOLOGY JSC"
        subtitle="Aug 2, 2018 - Dec 3, 2018"
        :avatar="require('@/assets/images/Homepage/sapo-logo.png')"
      >
        <div clas="text-body-1">
          <span class="text-weight-bold">Position</span>: Intern Front-End
        </div>
        <div clas="text-body-1">
          <span class="text-weight-bold">Main job</span>: Edit - Upgrade
          Template using View Engine Liquid
        </div>
        <div clas="text-body-1">
          <span class="text-weight-bold">Technology</span>: HTML, CSS,
          Javascript & Liquid
        </div>
      </q-timeline-entry>

      <q-timeline-entry
        title="Sai Gon University"
        subtitle="Sep 2, 2015 - Jan 15, 2020"
        :avatar="require('@/assets/images/Homepage/sgu-logo.png')"
      >
        <div class="text-body-1">
          <span class="text-weight-bold">Level</span>: University degree
        </div>
        <div class="text-body-1">
          <span class="text-weight-bold">Specialized</span>: Information system
        </div>
        <div class="text-body-1">
          <span class="text-weight-bold">Graduate</span>: Information technology
          engineer
        </div>
      </q-timeline-entry>
    </q-timeline>
  </div>
</template>
