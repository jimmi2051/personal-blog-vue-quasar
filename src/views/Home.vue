<template>
  <div class="home">
    <!-- <AboutComponent />
    <ServiceComponent />
    <CallComponent />
    <WorkComponent />-->
    <div style="padding-top: 400px;padding-left:100px">
      Helo world
      <q-btn @click="$q.notify('My message')" color="primary" label="Show a notification" />

      <q-btn @click="showNotification" color="primary" label="Show another notification" />
      <p class="text-primary">Text Primary</p>
      <p class="bg-positive">Background >>>></p>
      <q-layout>
        <q-page-container>
          <q-page>
            <q-toolbar>
              <q-toolbar-title :padding="1">My Todo</q-toolbar-title>
              <button @click="add">
                <i>add</i>
              </button>
            </q-toolbar>
            <q-list bordered padding v-if="items.length>0">
              <q-item v-for="(item, index) in items" :key="index">
                <q-item-section>
                  <span :class="item.completed ? 'completed-line' : ''">{{item.name}}</span>
                </q-item-section>
                <q-item-section avatar>
                  <q-toggle class="item-secondary" icon="done" v-model="item.completed"></q-toggle>
                </q-item-section>
              </q-item>
              <q-separator spaced />
            </q-list>
          </q-page>
        </q-page-container>
      </q-layout>
    </div>
  </div>
</template>
<style>
.completed-line {
  text-decoration: line-through;
}
</style>
<script>
// // @ is an alias to /src

import AboutComponent from "@/components/About.vue";
import ServiceComponent from "@/components/Service.vue";
import CallComponent from "@/components/Call.vue";
import WorkComponent from "@/components/Work.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "home",
  components: {
    AboutComponent,
    ServiceComponent,
    CallComponent,
    WorkComponent
  },
  data() {
    return {
      items: []
    };
  },
  created: function() {
    let payload = {
      id: "11",
      nextErr: err => {
        console.log(err);
      },
      nextSuccess: success => {
        console.log(success);
      }
    };
    this.getListTraining(payload);
  },
  methods: {
    ...mapActions("User", [
      "getListTraining" // map `this.increment()` to `this.$store.dispatch('increment')`
    ]),
    showNotification() {
      this.$q.notify("This is message >>>> ");
    },
    add() {
      this.$q
        .dialog({
          title: "New task",
          prompt: {
            task: {
              type: "textbox",
              model: ""
            }
          },
          cancel: true,
          persistent: true
        })
        .onOk(newTask => {
          this.items.push({
            name: newTask,
            completed: false
          });
        });
    },
    remove() {}
  },
  computed: {
    ...mapState("User", ["trainingList"])
  }
};
</script>
