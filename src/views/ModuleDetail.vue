<template>
  <q-page>
    <PageTitle title="Practice" />
    <div class="practice">
      <q-card class="practice-card">
        <q-card-section>
          <div class="text-h6">Take The Test</div>
          <div class="text-subtitle2">
            Practice: {{ store.title || "Unkown" }}
          </div>
        </q-card-section>

        <q-separator />

        <q-tabs
          v-model="moduleTab"
          inline-label
          outside-arrows
          mobile-arrows
          class="bg-primary text-white shadow-2"
          v-if="!store.loading"
        >
          <q-tab
            :name="module.id"
            :label="`${module.point} || ${module.title}`"
            v-for="(module, idxModule) in store.data"
            :key="module.id"
            icon="star_border"
          >
            <i
              v-if="makerResult[idxModule].isDone"
              class="fas fa-check-circle"
              style="padding-left: 10px; color: #33cc33;"
            />
          </q-tab>
        </q-tabs>
        <q-tab-panels
          v-model="moduleTab"
          animated
          v-for="(module, idxModule) in store.data"
          :key="module.id"
        >
          <q-tab-panel :name="module.id">
            <q-tabs
              v-model="sectionTab"
              inline-label
              outside-arrows
              mobile-arrows
              class="light-blue text-white shadow-2"
            >
              <q-tab
                :name="content.id"
                :label="'Part: ' + (idxContent + 1)"
                v-for="(content, idxContent) in module.contents"
                :key="content.id"
              >
                <i
                  v-if="makerResult[idxModule].contents[idxContent].isDone"
                  class="fas fa-check-circle"
                  style="padding-left: 10px; color: #33cc33;"
                />
              </q-tab>
            </q-tabs>
            <q-tab-panels
              v-model="sectionTab"
              animated
              v-for="(content, idxContent) in module.contents"
              :key="content.id"
            >
              <q-tab-panel :name="content.id">
                <q-tabs
                  v-model="current"
                  inline-label
                  outside-arrows
                  mobile-arrows
                  class="blue text-white shadow-2"
                >
                  <q-tab
                    :name="idxData + 1"
                    :label="idxData + 1"
                    v-for="(data, idxData) in content.data"
                    :key="idxData + 1"
                  >
                    <i
                      v-if="
                        makerResult[idxModule].contents[idxContent].data[
                          idxData
                        ].isDone
                      "
                      class="fas fa-check-circle"
                      style="padding-left: 10px; color: #33cc33;"
                    />
                  </q-tab>
                </q-tabs>

                <div
                  v-if="content.data && current - 1 < content.data.length"
                  class="question"
                >
                  <p class="question-help">
                    Choose the option the best completes each of the following
                    sentences
                  </p>
                  <p class="question-q">
                    {{ content.data[current - 1].question }}
                  </p>
                  <ul class="question-answers">
                    <li
                      v-for="(ans, idxAns) in content.data[current - 1].answers"
                      :key="idxAns"
                      :class="
                        `${
                          makerResult[idxModule].contents[idxContent].data[
                            current - 1
                          ].answer === ans
                            ? 'active'
                            : ''
                        } ${
                          isSubmitted &&
                          makerResult[idxModule].contents[idxContent].data[
                            current - 1
                          ].result === false &&
                          makerResult[idxModule].contents[idxContent].data[
                            current - 1
                          ].answer === ans
                            ? 'result-false'
                            : ''
                        } ${
                          isSubmitted &&
                          makerResult[idxModule].contents[idxContent].data[
                            current - 1
                          ].result &&
                          makerResult[idxModule].contents[idxContent].data[
                            current - 1
                          ].answer === ans
                            ? 'result-true'
                            : ''
                        }`
                      "
                      @click="
                        handleChooseAnswer(
                          idxModule,
                          idxContent,
                          current - 1,
                          ans
                        )
                      "
                    >
                      {{ ans }}
                    </li>
                  </ul>
                </div>
                <div
                  class="question-arrow"
                  v-if="content.data && current - 1 < content.data.length"
                >
                  <q-btn
                    class="btn-submit"
                    color="light-blue"
                    label="Submit"
                    :disabled="!enableSubmit || isSubmitted"
                    @click="handleSubmitAnswer"
                  />
                  <i
                    :class="`${current === 1 && 'disabled'} fas fa-arrow-left`"
                    @click="current -= 1"
                  />
                  <i
                    :class="
                      `${content.data &&
                        current === content.data.length &&
                        'disabled'} fas fa-arrow-right`
                    "
                    @click="current += 1"
                  />
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </q-tab-panel>
        </q-tab-panels>
        <q-card-actions vertical v-if="store.loading">
          <q-item>
            <q-inner-loading :showing="true">
              <q-spinner-gears size="50px" color="primary" />
            </q-inner-loading>
          </q-item>
        </q-card-actions>
      </q-card>
      <q-dialog v-model="isShowResult">
        <q-card class="result">
          <q-card-section>
            <h4 class="result-title">Test Complete</h4>
            <p class="result-description">
              Congratulations on completing the test! Here are the results:
            </p>
            <p class="result-score">
              Total: {{ totalPointGot }}/ {{ totalPoint }}
            </p>
            <table class="result-table">
              <tbody>
                <tr v-for="(module, index) in store.data" :key="module.id">
                  <td>{{ module.title }}</td>
                  <td>{{ makerResult[index].point }}/{{ module.point }}</td>
                </tr>
              </tbody>
            </table>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn flat label="CLOSE" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
import PageTitle from "components/PageTitle.vue";
function mapStateToProps(state) {
  const userProfile = state.User.userProfile;
  const data = state.Practice.modules.data;
  let makerResult = [];
  let totalPoint = 0;

  data.forEach(module => {
    let makerModule = {
      isDone: false,
      contents: []
    };
    totalPoint += module.point;
    if (module.contents) {
      module.contents.forEach(content => {
        let makerContent = {
          isDone: false,
          data: []
        };
        if (content.data) {
          content.data.forEach(() => {
            let makerQuest = {
              isDone: false,
              answer: ""
            };
            makerContent.data.push(makerQuest);
          });
        } else {
          makerContent.isDone = true;
        }
        makerModule.contents.push(makerContent);
      });
    } else {
      makerModule.isDone = true;
    }
    makerResult.push(makerModule);
  });

  this.makerResult = makerResult;
  this.totalPoint = totalPoint;
  const { params } = this.$route;
  let title = "";
  if (params.id && data && data.length > 0) {
    const insModule = data[0];
    title =
      insModule.practices.find(practice => practice.id === params.id)?.title ??
      "Unknow";
  }
  return {
    userProfile,
    data,
    loading: state.Practice.modules.loading,
    title
  };
}
export default {
  components: {
    PageTitle
  },
  created: function() {
    const { params } = this.$route;
    if (!params.id) {
      this.$router.push("/");
    }
    this.handleGetModule(params.id);
  },
  methods: {
    ...mapActions("Practice", ["getModulesByPracticeId"]),
    handleGetModule(practiceId) {
      let payload = {
        nextErr: err => {
          console.log("[ERROR] " + err);
        },
        nextSuccess: response => {
          if (response.error) {
            this.$q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: response.message
            });
            this.$router.push("/");
          }
        },
        practiceId
      };
      this.getModulesByPracticeId(payload);
    },
    handleChooseAnswer(idxModule, idxContent, idxData, answer) {
      if (this.isSubmitted) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "You can not change the answer after submit"
        });
        return;
      }
      this.makerResult[idxModule].contents[idxContent].data[
        idxData
      ].answer = answer;
      this.makerResult[idxModule].contents[idxContent].data[
        idxData
      ].isDone = true;
      const checkDoneContent = this.makerResult[idxModule].contents[
        idxContent
      ].data.findIndex(data => data.isDone === false);
      if (checkDoneContent === -1) {
        this.makerResult[idxModule].contents[idxContent].isDone = true;
      }
      const checkDoneModule = this.makerResult[idxModule].contents.findIndex(
        content => content.isDone === false
      );
      if (checkDoneModule === -1) {
        this.makerResult[idxModule].isDone = true;
      }
      const checkDoneModules = this.makerResult.findIndex(
        result => result.isDone === false
      );
      if (checkDoneModules === -1) {
        this.enableSubmit = true;
      }
    },
    handleSubmitAnswer() {
      this.totalPointGot = 0;
      const { data } = this.store;
      data.forEach((module, idxModule) => {
        if (module.contents) {
          module.contents.forEach((content, idxContent) => {
            if (content.data) {
              content.data.forEach((data, idxData) => {
                if (
                  this.makerResult[idxModule].contents[idxContent].data[idxData]
                    .answer === data.result
                ) {
                  this.makerResult[idxModule].contents[idxContent].data[
                    idxData
                  ].result = true;
                } else {
                  this.makerResult[idxModule].contents[idxContent].data[
                    idxData
                  ].result = false;
                }
              });
            }

            const checkAnswerFailed = this.makerResult[idxModule].contents[
              idxContent
            ].data.findIndex(data => data.result === false);
            if (checkAnswerFailed === -1) {
              this.makerResult[idxModule].contents[idxContent].result = true;
            } else {
              this.makerResult[idxModule].contents[idxContent].result = false;
            }
          });
          const checkAnswerFailed = this.makerResult[
            idxModule
          ].contents.findIndex(content => content.result === false);
          if (checkAnswerFailed === -1) {
            this.makerResult[idxModule].result = true;
            this.makerResult[idxModule].point = module.point;
          } else {
            this.makerResult[idxModule].result = false;
            const totalAnswerCorrect = this.makerResult[
              idxModule
            ].contents.filter(content => content.result === true).length;
            const point =
              Math.round(
                (totalAnswerCorrect /
                  this.makerResult[idxModule].contents.length) *
                  module.point *
                  100
              ) / 100;
            this.makerResult[idxModule].point = point;
          }
        }

        this.totalPointGot += this.makerResult[idxModule].point;
      });
      this.isSubmitted = true;
      this.isShowResult = true;
    }
  },
  meta: {
    // sets document title
    title: "Practice Detail Page",
    titleTemplate: title => `${title} - DefTnt Blog`
  },
  computed: {
    ...mapState({
      store: mapStateToProps
    })
  },
  data() {
    return {
      moduleTab: "",
      sectionTab: "",
      current: 1,
      makerResult: [],
      enableSubmit: false,
      isSubmitted: false,
      isShowResult: false,
      totalPoint: 0,
      totalPointGot: 0
    };
  }
};
</script>
