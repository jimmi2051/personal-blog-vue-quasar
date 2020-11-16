<template>
  <div class="message-box">
    <div class="message-box__header"></div>
    <div class="message-box__body">
      <div v-if="messages.length">
        <div
          v-for="message in messages"
          :key="message.message"
          style="width: 100%; max-width: 400px"
        >
          <q-chat-message
            :name="message.user ? message.user : ''"
            :text="[message.message]"
            :sent="message.sent ? true : false"
            :bg-color="message.sent ? 'amber-7' : 'primary'"
          />
        </div>
      </div>
    </div>
    <div class="message-box__footer">
      <input
        v-model="msgToSend"
        class="input-chat"
        type="text"
        placeholder="Aa"
      />
      <button v-on:click="onSendMessage" class="btn-send">
        Send
      </button>
    </div>
  </div>
</template>
<script>
import Pusher from "pusher-js"; // import Pusher
import { isEmpty } from "lodash";
import FetchApi from "utils/FetchApi";
import { CHANNEL } from "utils/Constants";
import { v4 as uuidv4 } from "uuid";
const names = ["Tí", "Tèo", "Tủn"];
export default {
  created: function() {
    // console.log("this ==>", this.$ref);

    // import { Notify } from "quasar";
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;
    const pusher = new Pusher("1bb3ea564162ad9f320a", {
      cluster: "ap1"
    });
    const channel = pusher.subscribe("deftnt-channel");
    channel.bind("chat-message", data => {
      let id = localStorage.getItem("userId");
      if (id !== data.id) {
        this.messages.push(data);
      }
    });
  },
  data() {
    return {
      messages: [],
      msgToSend: ""
    };
  },
  methods: {
    onSendMessage() {
      let id = localStorage.getItem("userId");
      let name = localStorage.getItem("userName");
      if (isEmpty(id)) {
        const index = Math.floor(Math.random() * 3);
        id = uuidv4();
        name = names[index];
        localStorage.setItem("userId", id);
        localStorage.setItem("userName", name);
      }

      const message = {
        id,
        user: "Me",
        message: this.msgToSend,
        sent: true
      };
      this.messages.push(message);

      const payload = {
        uri: "send-message",
        params: {
          id,
          user: name,
          message: this.msgToSend,
          channel: CHANNEL
        },
        opt: {
          method: "POST"
        }
      };
      FetchApi(payload).then(response => {
        // this.messages.push(response);>
        console.log("RES ==>", response);
      });
    }
  }
};
</script>
