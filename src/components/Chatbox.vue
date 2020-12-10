<template>
  <div>
    <div
      :class="isCalling ? `popup-calling is-show` : `popup-calling`"
      id="app"
    >
      <video muted playsinline id="selfview" autoplay></video>
      <video id="remoteview" playsinline autoplay></video>
      <q-icon
        color="danger"
        class="endcall"
        name="phone"
        @click="endCurrentCall"
      />
      <!-- </button> -->
    </div>
    <div :class="isShow ? `show-message` : `show-message is-show`">
      <button @click="showMessage" type="button" class="show-message__btn">
        <i class="fab fa-facebook-messenger fa-2x" aria-hidden="true" />
      </button>
    </div>
    <div class="call-video">
      <q-list bordered v-if="users.length" style="border-radius: 15px">
        <q-item
          v-for="user in users"
          :key="user.id"
          clickable
          v-ripple
          @click="callUser(user.id)"
          style="padding-left: 15px; padding-right: 15px; border-radius: 15px"
        >
          <q-item-section>{{ user.info.name }}</q-item-section>
          <q-item-section avatar>
            <q-icon color="primary" name="phone" />
          </q-item-section>
        </q-item>
        <!-- <q-separator /> -->
      </q-list>
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
            @keyup.enter="
              prompt = false;
              submitName();
            "
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Submit name" @click="submitName" v-close-popup />
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
          placeholder="Enter message here... (/? to get help)"
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
const API_URL = process.env.VUE_APP_API_URL;
// import SimplePeer from "simple-peer";

import { mapActions, mapState } from "vuex";
function mapStateToProps(state) {
  const data = state.Message.messageList.data;
  return {
    loading: state.Message.messageList.loading,
    messageList: data,
  };
}

export default {
  created: function () {
    this.initMessageBox();

    let id = localStorage.getItem("userId");
    let name = localStorage.getItem("userName");
    if (isEmpty(id)) {
      this.prompt = true;
    } else {
      this.name = name;
      this.initCallBox(id, name);
    }
  },
  data() {
    return {
      messages: [],
      msgToSend: "",
      isShow: false,
      prompt: false,
      name: "",
      id: "",
      users: [],
      usersOnline: 0,
      channcel: "",
      room: "",
      localUserMedia: "",
      isCalling: false,
      typeInit: 1,
      caller: null,
      activeBot: true,
    };
  },
  methods: {
    ...mapActions("Message", ["getMessageList"]),
    handlePushMessage(message) {
      if (this.messages.length > 0) {
        const lastestMsg = this.messages[this.messages.length - 1];
        if (lastestMsg.id === message.id) {
          delete message.user;
        }
      }
      this.msgToSend = "";
      this.messages.push(message);
    },
    onSendMessage() {
      // Get ID if empty will init with name & save to local storage
      let id = localStorage.getItem("userId");
      if (isEmpty(id)) {
        id = uuidv4();
        localStorage.setItem("userId", id);
        localStorage.setItem("userName", this.name);
      }
      // Case Msg Empty Return
      if (this.msgToSend === "") {
        this.$q.notify({
          message: "Oops! Sorry, please enter your message.",
          color: "light-blue",
          icon: "announcement",
        });
        return;
      }
      // Case get help
      if (this.msgToSend === "/?") {
        const messageEnableBot = {
          id,
          user: "Me",
          message: "/bot on # Enable bot",
          sent: true,
        };
        const messageDisableBot = {
          id,
          user: "Me",
          message: "/bot off # Disable bot",
          sent: true,
        };
        this.handlePushMessage(messageEnableBot);
        this.handlePushMessage(messageDisableBot);
        return;
      }
      // Case enable bot
      if (this.msgToSend === "/bot on") {
        this.activeBot = true;
        const messageEnableBot = {
          id,
          user: "Me",
          message: "Bot have been enabled.",
          sent: true,
        };
        this.handlePushMessage(messageEnableBot);
        return;
      }
      // Case disable bot
      if (this.msgToSend === "/bot off") {
        this.activeBot = false;
        const messageDisableBot = {
          id,
          user: "Me",
          message: "Bot have been disabled.",
          sent: true,
        };
        this.handlePushMessage(messageDisableBot);
        return;
      }
      // Case normal
      const message = {
        id,
        user: "Me",
        message: this.msgToSend,
        sent: true,
      };
      this.handlePushMessage(message);

      const payload = {
        uri: "send-message",
        params: {
          id,
          user: this.name,
          message: message.message,
          channel: CHANNEL,
          activeBot: this.activeBot,
        },
        opt: {
          method: "POST",
        },
      };
      FetchApi(payload).then((response) => {
        if (response.id) {
          console.log("success!");
        } else {
          this.$q.notify({
            message:
              "Oops! Sorry, can't send message now. Please wait a few minutes and try again. Thanks",
            color: "light-blue",
            icon: "announcement",
          });
        }
      });
    },

    submitName() {
      const id = uuidv4();
      localStorage.setItem("userId", id);
      localStorage.setItem("userName", this.name);
      this.initCallBox(id, this.name);
    },

    showMessage() {
      if (isEmpty(this.name)) {
        let id = localStorage.getItem("userId");
        let name = localStorage.getItem("userName");
        if (isEmpty(id)) {
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
    },

    getCam() {
      //Get local audio/video feed and show it in selfview video element
      return navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
    },

    callUser(user) {
      this.isCalling = true;
      this.getCam()
        .then((stream) => {
          if (window.URL) {
            // document.getElementById("selfview").srcObject = {};
            document.getElementById("selfview").srcObject = stream;
          } else {
            // document.getElementById("selfview").src = "";
            document.getElementById("selfview").src = stream;
          }
          this.caller.addStream(stream);
          this.localUserMedia = stream;
          this.caller.createOffer().then((desc) => {
            this.caller.setLocalDescription(new RTCSessionDescription(desc));
            this.channel.trigger("client-sdp", {
              sdp: desc,
              room: user,
              from: this.id,
            });
            this.room = user;
          });
        })
        .catch((error) => {
          this.$q.notify({
            message: error,
            color: "light-blue",
            icon: "announcement",
          });
          this.isCalling = false;
          this.endCall();
        });
    },

    GetRTCIceCandidate() {
      window.RTCIceCandidate =
        window.RTCIceCandidate ||
        window.webkitRTCIceCandidate ||
        window.mozRTCIceCandidate ||
        window.msRTCIceCandidate;

      return window.RTCIceCandidate;
    },

    GetRTCPeerConnection() {
      window.RTCPeerConnection =
        window.RTCPeerConnection ||
        window.webkitRTCPeerConnection ||
        window.mozRTCPeerConnection ||
        window.msRTCPeerConnection;
      return window.RTCPeerConnection;
    },

    GetRTCSessionDescription() {
      window.RTCSessionDescription =
        window.RTCSessionDescription ||
        window.webkitRTCSessionDescription ||
        window.mozRTCSessionDescription ||
        window.msRTCSessionDescription;
      return window.RTCSessionDescription;
    },

    prepareCaller() {
      //Initializing a peer connection
      this.caller = new window.RTCPeerConnection();
      //Listen for ICE Candidates and send them to remote peers
      this.caller.onicecandidate = (evt) => {
        if (!evt.candidate) return;
        console.log("onicecandidate called");
        this.onIceCandidate(this.caller, evt);
      };
      //onaddstream handler to receive remote feed and show in remoteview video element
      this.caller.onaddstream = (evt) => {
        if (window.URL) {
          // document.getElementById("remoteview").srcObject = {};
          document.getElementById("remoteview").srcObject = evt.stream;
        } else {
          // document.getElementById("remoteview").src = "";
          document.getElementById("remoteview").src = evt.stream;
        }
      };
    },

    endCall() {
      this.isCalling = false;
      this.room = undefined;
      this.caller.close();
      for (let track of this.localUserMedia.getTracks()) {
        track.stop();
      }
      this.prepareCaller();
    },

    onIceCandidate(peer, evt) {
      if (evt.candidate) {
        this.channel.trigger("client-candidate", {
          candidate: evt.candidate,
          room: this.room,
        });
      }
    },

    endCurrentCall() {
      this.channel.trigger("client-endcall", {
        room: this.room,
      });

      this.endCall();
    },

    initMessageBox() {
      let payload = {
        nextErr: (err) => {
          console.log(err);
        },
        nextSuccess: (success) => {
          console.log("Debug ===>", success);
        },
      };
      // this.getListTraining(payload);
      this.getMessageList(payload);
      // Enable pusher logging - don't include this in production
      Pusher.logToConsole = true;
      const pusherMessage = new Pusher("1bb3ea564162ad9f320a", {
        cluster: "ap1",
      });
      const channelMessage = pusherMessage.subscribe("deftnt-channel");
      channelMessage.bind("chat-message", (data) => {
        let id = localStorage.getItem("userId");
        if (id !== data.id) {
          this.handlePushMessage(data);
        }
      });
    },

    initCallBox(userId, userName) {
      const pusher = new Pusher("1bb3ea564162ad9f320a", {
        cluster: "ap1",
        encrypted: true,
        authEndpoint: `${API_URL}pusher/auth?userName=${userName}&userId=${userId}`,
      });

      const channel = pusher.subscribe("presence-videocall");
      channel.bind("pusher:subscription_succeeded", (members) => {
        //set the member count
        this.usersOnline = members.count;
        this.id = channel.members.me.id;

        members.each((member) => {
          if (member.id != channel.members.me.id) {
            this.users.push(member);
          }
        });
      });

      channel.bind("pusher:member_added", (member) => {
        this.users.push(member);
      });

      channel.bind("pusher:member_removed", (member) => {
        // for remove member from list:
        const index = this.users.findIndex((user) => user.id === member.id);
        this.users.splice(index, 1);
        if (member.id == this.room) {
          this.endCall();
        }
      });
      this.channel = channel;
      this.GetRTCIceCandidate();
      this.GetRTCPeerConnection();
      this.GetRTCSessionDescription();
      this.prepareCaller();

      channel.bind("client-candidate", async (msg) => {
        if (msg.room == this.room) {
          await this.caller.addIceCandidate(new RTCIceCandidate(msg.candidate));
        }
      });
      channel.bind("client-endcall", (msg) => {
        if (msg.room == this.room) {
          this.endCall();
          this.isCalling = false;
        }
      });
      channel.bind("client-sdp", (msg) => {
        if (msg.room == this.id) {
          const answer = confirm(
            "You have a call from: " + msg.from + "Would you like to answer?"
          );
          if (!answer) {
            return channel.trigger("client-reject", {
              room: msg.room,
              rejected: this.id,
            });
          }
          this.isCalling = true;
          this.room = msg.room;
          this.getCam()
            .then((stream) => {
              this.localUserMedia = stream;
              if (window.URL) {
                // document.getElementById("selfview").srcObject = {};
                document.getElementById("selfview").srcObject = stream;
              } else {
                // document.getElementById("selfview").src = "";
                document.getElementById("selfview").src = stream;
              }
              this.caller.addStream(stream);
              var sessionDesc = new RTCSessionDescription(msg.sdp);
              this.caller.setRemoteDescription(sessionDesc);
              this.caller.createAnswer().then((sdp) => {
                this.caller.setLocalDescription(new RTCSessionDescription(sdp));
                channel.trigger("client-answer", {
                  sdp: sdp,
                  room: this.room,
                });
              });
            })
            .catch((error) => {
              this.$q.notify({
                message: error,
                color: "light-blue",
                icon: "announcement",
              });
              this.isCalling = false;
            });
        }
      });
      channel.bind("client-answer", (answer) => {
        if (answer.room == this.room) {
          console.log("answer received");
          this.caller.setRemoteDescription(
            new RTCSessionDescription(answer.sdp)
          );
        }
      });

      channel.bind("client-reject", (answer) => {
        if (answer.room == this.room) {
          console.log("Call declined");
          alert("call to " + answer.rejected + "was politely declined");
          this.endCall();
        }
      });
    },
  },
  updated() {
    // This will be called when the component updates
    // try toggling a todo
    this.scrollToEnd();
    if (this.messages.length === 0) {
      let id = localStorage.getItem("userId");

      const { messageList, loading } = this.store;
      if (!loading && messageList.length > 0) {
        messageList.map((message) => {
          const parseMessage = {
            id: message.senderId,
            user: message.senderId === id ? "Me" : message.senderName,
            message: message.message,
            sent: message.senderId === id,
          };
          this.handlePushMessage(parseMessage);
        });
      }
    }
  },
  mounted() {
    this.scrollToEnd();
  },
  computed: {
    ...mapState({
      store: mapStateToProps,
    }),
  },
};
</script>
