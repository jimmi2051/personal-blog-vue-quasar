<template>
  <div>
    <div :class="isShow ? `show-message` : `show-message is-show`">
      <button @click="showMessage" type="button" class="show-message__btn">
        <i class="fab fa-facebook-messenger fa-2x" aria-hidden="true" />
      </button>
    </div>
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Your name</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="name"
            autofocus
            @keyup.enter="prompt = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            flat
            label="Submit name"
            @click="isShow = true"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div :class="isShow ? `message-box is-show` : `message-box`">
      <div class="message-box__header">
        <q-avatar>
          <img
            src="https://cdn.quasar.dev/img/avatar1.jpg"
            class="avatar-img"
          />
        </q-avatar>
        <p class="name-user">{{ name }}</p>
        <button @click="isShow = false" type="button" class="btn-remove">
          <i class="fa fa-times" />
        </button>
      </div>
      <div class="message-box__body" id="message-box__body">
        <div v-if="messages.length">
          <div
            v-for="(message, index) in messages"
            :key="index"
            style="width: 100%; max-width: 400px"
          >
            <q-chat-message
              :name="message.user ? message.user : ''"
              :text="[message.message]"
              :sent="message.sent ? true : false"
              :text-color="message.sent ? 'black' : 'white'"
              :bg-color="message.sent ? 'amber-7' : 'light-blue'"
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
          @keyup.enter="onSendMessage"
        />
        <button type="button" @click="onSendMessage" class="btn-send">
          <i class="fas fa-paper-plane" />
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import Pusher from "pusher-js"; // import Pusher
import { isEmpty } from "lodash";
import FetchApi from "utils/FetchApi";
import { CHANNEL } from "utils/Constants";
import { v4 as uuidv4 } from "uuid";

import { mapActions, mapState } from "vuex";
function mapStateToProps(state) {
  const data = state.Message.messageList.data;
  // if(data.length>0)
  // {

  // }
  return {
    loading: state.Message.messageList.loading,
    messageList: data
  };
}

export default {
  created: function() {
    let payload = {
      nextErr: err => {
        console.log(err);
      },
      nextSuccess: success => {
        console.log("Debug ===>", success);
      }
    };
    // this.getListTraining(payload);
    this.getMessageList(payload);
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;
    const pusher = new Pusher("1bb3ea564162ad9f320a", {
      cluster: "ap1"
    });
    const channel = pusher.subscribe("deftnt-channel");
    channel.bind("chat-message", data => {
      let id = localStorage.getItem("userId");
      if (id !== data.id) {
        if (this.messages.length > 0) {
          const lastestMsg = this.messages[this.messages.length - 1];
          if (lastestMsg.id === data.id) {
            delete data.user;
          }
        }
        this.messages.push(data);
      }
    });
  },
  data() {
    return {
      messages: [],
      msgToSend: "",
      isShow: false,
      prompt: false,
      name: ""
    };
  },
  methods: {
    ...mapActions("Message", ["getMessageList"]),
    onSendMessage() {
      if (this.msgToSend === "") {
        this.$q.notify({
          message: "Oops! Sorry, please enter your message.",
          color: "light-blue",
          icon: "announcement"
        });
        return;
      }
      let id = localStorage.getItem("userId");
      if (isEmpty(id)) {
        id = uuidv4();
        localStorage.setItem("userId", id);
        localStorage.setItem("userName", this.name);
      }

      const message = {
        id,
        user: "Me",
        message: this.msgToSend,
        sent: true
      };
      if (this.messages.length > 0) {
        const lastestMsg = this.messages[this.messages.length - 1];
        if (lastestMsg.id === message.id) {
          delete message.user;
        }
      }
      this.messages.push(message);

      const payload = {
        uri: "send-message",
        params: {
          id,
          user: this.name,
          message: this.msgToSend,
          channel: CHANNEL
        },
        opt: {
          method: "POST"
        }
      };
      FetchApi(payload).then(response => {
        // this.messages.push(response);>
        if (response.id) {
          this.msgToSend = "";
        } else {
          this.$q.notify({
            message:
              "Oops! Sorry, can't send message now. Please wait a few minutes and try again. Thanks",
            color: "light-blue",
            icon: "announcement"
          });
        }
      });
    },
    showMessage() {
      if (isEmpty(this.name)) {
        let id = localStorage.getItem("userId");
        let name = localStorage.getItem("userName");
        if (isEmpty(id)) {
          // const index = Math.floor(Math.random() * 3);
          // id = uuidv4();
          // name = names[index];
          // localStorage.setItem("userId", id);
          // localStorage.setItem("userName", name);
          this.prompt = true;
        } else {
          this.name = name;
          this.isShow = true;
        }
      } else {
        this.isShow = true;
      }
    },
    scrollToEnd() {
      const container = this.$el.querySelector("#message-box__body");
      container.scrollTop = container.scrollHeight - container.clientHeight;
    }
  },
  updated() {
    // This will be called when the component updates
    // try toggling a todo
    this.scrollToEnd();
    if (this.messages.length === 0) {
      let id = localStorage.getItem("userId");

      const { messageList, loading } = this.store;
      if (!loading && messageList.length > 0) {
        messageList.map(message => {
          const parseMessage = {
            id: message.senderId,
            user: message.senderId === id ? "Me" : message.senderName,
            message: message.message,
            sent: message.senderId === id
          };
          if (this.messages.length > 0) {
            const lastestMsg = this.messages[this.messages.length - 1];
            if (lastestMsg.id === parseMessage.id) {
              delete parseMessage.user;
            }
          }
          this.messages.push(parseMessage);
        });
      }
      console.log("==>", this.store);
      console.log("this ==>", this.messages);
    }
  },
  mounted() {
    this.scrollToEnd();
  },
  computed: {
    ...mapState({
      store: mapStateToProps
    })
  }
};
</script>
