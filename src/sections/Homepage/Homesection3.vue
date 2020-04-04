<template>
  <div>
    <div class="text-h3 section--title">My Skills</div>
    <q-splitter v-model="splitterModel">
      <template v-slot:before>
        <div class="q-pa-md">
          <div class="text-h4 q-mb-md">Hard skills</div>
          <div class="row q-pt-sm q-pb-sm">
            <div class="text-h6 col-3" style>ReactJS:</div>
            <q-linear-progress
              class="col-9 progress"
              stripe
              color="light-blue-3"
              size="10px"
              :value="pReact"
            />
          </div>
          <div class="row q-pt-sm q-pb-sm">
            <div class="text-h6 col-3" style>Django:</div>
            <q-linear-progress
              class="col-9 progress"
              stripe
              color="light-blue-3"
              size="10px"
              :value="pDjango"
            />
          </div>
          <div class="row q-pt-sm q-pb-sm">
            <div class="text-h6 col-3" style>ASP.NET:</div>
            <q-linear-progress
              class="col-9 progress"
              stripe
              color="light-blue-3"
              size="10px"
              :value="pNet"
            />
          </div>
          <div class="row q-pt-sm q-pb-sm">
            <div class="text-h6 col-3" style>VueJS:</div>
            <q-linear-progress
              class="col-9 progress"
              stripe
              color="light-blue-3"
              size="10px"
              :value="pVue"
            />
          </div>
          <div class="row q-pt-sm q-pb-sm">
            <div class="text-h6 col-3" style>NodeJS:</div>
            <q-linear-progress
              class="col-9 progress"
              stripe
              color="light-blue-3"
              size="10px"
              :value="pNode"
            />
          </div>
        </div>
      </template>

      <template v-slot:after>
        <div class="q-pa-md">
          <div class="text-h4 q-mb-md">Soft Skills</div>
          <div class="row q-pt-sm q-pb-sm">
            <div class="text-h6 col-3" style>Communication:</div>
            <q-linear-progress
              class="col-9 progress"
              stripe
              color="light-blue-3"
              size="10px"
              :value="pCom"
            />
          </div>
          <div class="row q-pt-sm q-pb-sm">
            <div class="text-h6 col-3" style>Teamwork:</div>
            <q-linear-progress
              class="col-9 progress"
              stripe
              color="light-blue-3"
              size="10px"
              :value="pTeam"
            />
          </div>
          <div class="row q-pt-sm q-pb-sm">
            <div class="text-h6 col-3" style>Adaptability:</div>
            <q-linear-progress
              class="col-9 progress"
              stripe
              color="light-blue-3"
              size="10px"
              :value="pAdap"
            />
          </div>
          <div class="row q-pt-sm q-pb-sm">
            <div class="text-h6 col-3" style>Problem-Solving:</div>
            <q-linear-progress
              class="col-9 progress"
              stripe
              color="light-blue-3"
              size="10px"
              :value="pSol"
            />
          </div>
          <div class="row q-pt-sm q-pb-sm">
            <div class="text-h6 col-3" style>Creativity:</div>
            <q-linear-progress
              class="col-9 progress"
              stripe
              color="light-blue-3"
              size="10px"
              :value="pCreate"
            />
          </div>
        </div>
      </template>
    </q-splitter>
    <!-- <div class="q-gutter-y-md row q-pt-md">
      <div class="col q-pr-md">
        <div class="text-h4">Hard Skills</div>
        <div class="row q-pt-sm q-pb-sm">
          <div class="text-h6 col-3" style>ReactJS:</div>
          <q-linear-progress
            class="col-9 progress"
            stripe
            color="light-blue-3"
            size="10px"
            :value="pReact"
          />
        </div>
        <div class="row q-pt-sm q-pb-sm">
          <div class="text-h6 col-3" style>Django:</div>
          <q-linear-progress
            class="col-9 progress"
            stripe
            color="light-blue-3"
            size="10px"
            :value="pDjango"
          />
        </div>
        <div class="row q-pt-sm q-pb-sm">
          <div class="text-h6 col-3" style>ASP.NET:</div>
          <q-linear-progress
            class="col-9 progress"
            stripe
            color="light-blue-3"
            size="10px"
            :value="pNet"
          />
        </div>
        <div class="row q-pt-sm q-pb-sm">
          <div class="text-h6 col-3" style>VueJS:</div>
          <q-linear-progress
            class="col-9 progress"
            stripe
            color="light-blue-3"
            size="10px"
            :value="pVue"
          />
        </div>
        <div class="row q-pt-sm q-pb-sm">
          <div class="text-h6 col-3" style>NodeJS:</div>
          <q-linear-progress
            class="col-9 progress"
            stripe
            color="light-blue-3"
            size="10px"
            :value="pNode"
          />
        </div>
      </div>
      <div class="col q-pl-md">
        <div class="text-h4">Soft Skills</div>
        <div class="row q-pt-sm q-pb-sm">
          <div class="text-h6 col-3" style>Communication:</div>
          <q-linear-progress
            class="col-9 progress"
            stripe
            color="light-blue-3"
            size="10px"
            :value="pCom"
          />
        </div>
        <div class="row q-pt-sm q-pb-sm">
          <div class="text-h6 col-3" style>Teamwork:</div>
          <q-linear-progress
            class="col-9 progress"
            stripe
            color="light-blue-3"
            size="10px"
            :value="pTeam"
          />
        </div>
        <div class="row q-pt-sm q-pb-sm">
          <div class="text-h6 col-3" style>Adaptability:</div>
          <q-linear-progress
            class="col-9 progress"
            stripe
            color="light-blue-3"
            size="10px"
            :value="pAdap"
          />
        </div>
        <div class="row q-pt-sm q-pb-sm">
          <div class="text-h6 col-3" style>Problem-Solving:</div>
          <q-linear-progress
            class="col-9 progress"
            stripe
            color="light-blue-3"
            size="10px"
            :value="pSol"
          />
        </div>
        <div class="row q-pt-sm q-pb-sm">
          <div class="text-h6 col-3" style>Creativity:</div>
          <q-linear-progress
            class="col-9 progress"
            stripe
            color="light-blue-3"
            size="10px"
            :value="pCreate"
          />
        </div>
      </div>
    </div>-->
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
      pCreate: 0.7,
      splitterModel: 50 // start at 50%
    };
  }
};
</script>