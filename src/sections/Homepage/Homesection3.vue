<template>
  <div>
    <div class="section--title">My Skills</div>
    <div class="q-gutter-y-md row q-pt-md skill">
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 skill-hard">
        <div class="text-h4">Hard Skills</div>
        <div class="row q-pt-sm q-pb-sm">
          <div class="skill-title col-xs-4 col-sm-4 col-md-4 col-lg-3" style>ReactJS:</div>
          <q-linear-progress
            class="col-xs-8 col-sm-8 col-md-8 col-lg-9 progress"
            stripe
            color="light-blue-3"
            size="10px"
            :value="pReact"
          />
        </div>
        <div class="row q-pt-sm q-pb-sm">
          <div class="skill-title col-xs-4 col-sm-4 col-md-4 col-lg-3" style>Django:</div>
          <q-linear-progress
            class="col-xs-8 col-sm-8 col-md-8 col-lg-9 progress"
            stripe
            color="light-blue-3"
            size="10px"
            :value="pDjango"
          />
        </div>
        <div class="row q-pt-sm q-pb-sm">
          <div class="skill-title col-xs-4 col-sm-4 col-md-4 col-lg-3" style>ASP.NET:</div>
          <q-linear-progress
            class="col-xs-8 col-sm-8 col-md-8 col-lg-9 progress"
            stripe
            color="light-blue-3"
            size="10px"
            :value="pNet"
          />
        </div>
        <div class="row q-pt-sm q-pb-sm">
          <div class="skill-title col-xs-4 col-sm-4 col-md-4 col-lg-3" style>VueJS:</div>
          <q-linear-progress
            class="col-xs-8 col-sm-8 col-md-8 col-lg-9 progress"
            stripe
            color="light-blue-3"
            size="10px"
            :value="pVue"
          />
        </div>
        <div class="row q-pt-sm q-pb-sm">
          <div class="skill-title col-xs-4 col-sm-4 col-md-4 col-lg-3" style>NodeJS:</div>
          <q-linear-progress
            class="col-xs-8 col-sm-8 col-md-8 col-lg-9 progress"
            stripe
            color="light-blue-3"
            size="10px"
            :value="pNode"
          />
        </div>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 skill-soft">
        <div class="text-h4">Soft Skills</div>
        <div class="row q-pt-sm q-pb-sm">
          <div class="skill-title col-xs-4 col-sm-4 col-md-4 col-lg-3" style>Communication:</div>
          <q-linear-progress
            class="col-xs-8 col-sm-8 col-md-8 col-lg-9 progress"
            stripe
            color="light-blue-3"
            size="10px"
            :value="pCom"
          />
        </div>
        <div class="row q-pt-sm q-pb-sm">
          <div class="skill-title col-xs-4 col-sm-4 col-md-4 col-lg-3" style>Teamwork:</div>
          <q-linear-progress
            class="col-xs-8 col-sm-8 col-md-8 col-lg-9 progress"
            stripe
            color="light-blue-3"
            size="10px"
            :value="pTeam"
          />
        </div>
        <div class="row q-pt-sm q-pb-sm">
          <div class="skill-title col-xs-4 col-sm-4 col-md-4 col-lg-3" style>Adaptability:</div>
          <q-linear-progress
            class="col-xs-8 col-sm-8 col-md-8 col-lg-9 progress"
            stripe
            color="light-blue-3"
            size="10px"
            :value="pAdap"
          />
        </div>
        <div class="row q-pt-sm q-pb-sm">
          <div class="skill-title col-xs-4 col-sm-4 col-md-4 col-lg-3" style>Problem-Solving:</div>
          <q-linear-progress
            class="col-xs-8 col-sm-8 col-md-8 col-lg-9 progress"
            stripe
            color="light-blue-3"
            size="10px"
            :value="pSol"
          />
        </div>
        <div class="row q-pt-sm q-pb-sm">
          <div class="skill-title col-xs-4 col-sm-4 col-md-4 col-lg-3" style>Creativity:</div>
          <q-linear-progress
            class="col-xs-8 col-sm-8 col-md-8 col-lg-9 progress"
            stripe
            color="light-blue-3"
            size="10px"
            :value="pCreate"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //   ratingModel: 3,
      pReact: 0.8,
      pDjango: 0.8,
      pNet: 0.7,
      pVue: 0.5,
      pNode: 0.5,
      pCom: 0.8,
      pTeam: 0.8,
      pAdap: 0.8,
      pSol: 0.8,
      pCreate: 0.7
    };
  }
};
</script>