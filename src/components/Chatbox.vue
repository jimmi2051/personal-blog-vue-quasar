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
    </div>
    <div
      v-if="!isShow || !store.userProfile.isLogin"
      class="show-message is-show"
    >
      <button @click="showMessage" type="button" class="show-message__btn">
        <i class="fab fa-facebook-messenger fa-2x" aria-hidden="true" />
        <q-tooltip
          anchor="center left"
          content-class="bg-indigo"
          self="center right"
          :offset="[10, 10]"
        >
          Join the chat room
        </q-tooltip>
      </button>
    </div>
    <div v-else class="message-box is-show">
      <div class="message-box__header">
        <q-avatar>
          <img
            src="https://cdn.quasar.dev/img/avatar1.jpg"
            class="avatar-img"
          />
        </q-avatar>
        <p class="name-user">{{ store.userProfile.fullname }}</p>
        <button @click="isShow = false" type="button" class="btn-remove">
          <i class="fa fa-times" />
        </button>
      </div>
      <div class="message-box__body" id="message-box__body">
        <div v-if="!isLoading">
          <div
            @click="limit = -1"
            class="message-box__readmore"
            v-if="limit !== -1 && this.messages.length === 100"
          >
            View all messages
          </div>
          <div
            v-for="(message, index) in messagesFormat"
            :key="index"
            style="width: 100%; max-width: 400px"
          >
            <q-chat-message
              :name="message.user ? message.user : ''"
              :text="[message.message]"
              :sent="message.sent ? true : false"
              :text-color="message.sent ? 'black' : 'white'"
              :bg-color="message.sent ? 'amber-7' : 'light-blue'"
              :stamp="message.timeDuration"
            />
          </div>
        </div>
        <div v-else>
          <q-inner-loading :showing="true">
            <q-spinner-gears size="50px" color="primary" />
          </q-inner-loading>
        </div>
      </div>
      <div class="message-box__footer">
        <input
          v-model="msgToSend"
          class="input-chat"
          type="text"
          placeholder="Enter message here... (/? to get help)"
          @keyup.enter="onSendMessage"
          :disabled="isLoading"
        />
        <button
          :disabled="isLoading"
          type="button"
          @click="onSendMessage"
          class="btn-send"
        >
          <i class="fas fa-paper-plane" />
        </button>
      </div>
    </div>
    <div v-if="isShow" class="call-video">
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
      </q-list>
    </div>
  </div>
</template>
<script>
import Pusher from "pusher-js"; // import Pusher
import { isArray } from "lodash";
import FetchApi from "utils/FetchApi";
import { CHANNEL } from "utils/Constants";
import {
  processStamp,
  GetRTCIceCandidate,
  GetRTCPeerConnection,
  GetRTCSessionDescription,
  getCam
} from "utils/Helpers";
const API_URL = process.env.VUE_APP_API_URL;

import { mapActions, mapState } from "vuex";
function mapStateToProps(state) {
  const data = state.Message.messageList.data;
  const userProfile = state.User.userProfile;

  return {
    loading: state.Message.messageList.loading,
    messageList: data,
    userProfile
  };
}

export default {
  created: function() {
    if (this.store.userProfile.isLogin) {
      this.initMessageBox();
      const id = this.store.userProfile.id;
      const name = this.store.userProfile.fullname;
      this.id = id;
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
      isInit: false,
      limit: 100,
      isLoading: true
    };
  },
  methods: {
    ...mapActions("Message", ["getMessageList"]),
    handlePushMessage(message, type = 0) {
      this.msgToSend = "";
      if (type === 0) {
        if (this.messages.length > 0) {
          const lastestMsg = this.messages[this.messages.length - 1];
          if (lastestMsg.id === message.id) {
            delete message.user;
          }
        }
        this.messages.push(message);
      } else {
        const firstMsg = this.messages[0];
        if (firstMsg.id === message.id) {
          delete firstMsg.user;
        }
        this.messages.unshift(message);
      }
    },
    onSendMessage() {
      // Get ID if empty will init with name & save to local storage
      const id = this.store.userProfile.id;
      const name = this.store.userProfile.fullname;
      // Case Msg Empty Return
      if (this.msgToSend === "") {
        this.$q.notify({
          message: "Oops! Sorry, please enter your message.",
          color: "light-blue",
          icon: "announcement"
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
          createdAt: Date.now()
        };
        const messageDisableBot = {
          id,
          user: "Me",
          message: "/bot off # Disable bot",
          sent: true,
          createdAt: Date.now()
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
          createdAt: Date.now()
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
          createdAt: Date.now()
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
        createdAt: Date.now()
      };
      this.handlePushMessage(message);

      const payload = {
        uri: "send-message",
        params: {
          id,
          user: name,
          message: message.message,
          channel: CHANNEL,
          activeBot: this.activeBot
        },
        opt: {
          method: "POST"
        }
      };
      FetchApi(payload).then(response => {
        if (!response.id) {
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
      if (!this.store.userProfile.isLogin) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "Must sign in to join the chat room."
        });
        if (this.$route.path !== "/signin") {
          this.$router.push("/signin");
        }
      } else {
        this.isShow = true;
        if (this.messages.length === 0) {
          this.handleGetMessages(this.limit);
        }
        if (!this.isInit) {
          this.initMessageBox();
          const id = this.store.userProfile.id;
          const name = this.store.userProfile.fullname;
          this.id = id;
          this.name = name;
          this.initCallBox(id, name);
        }
      }
    },

    callUser(user) {
      this.isCalling = true;
      getCam()
        .then(stream => {
          if (window.URL) {
            // document.getElementById("selfview").srcObject = {};
            document.getElementById("selfview").srcObject = stream;
          } else {
            // document.getElementById("selfview").src = "";
            document.getElementById("selfview").src = stream;
          }
          this.caller.addStream(stream);
          this.localUserMedia = stream;
          this.caller.createOffer().then(desc => {
            this.caller.setLocalDescription(new RTCSessionDescription(desc));
            this.channel.trigger("client-sdp", {
              sdp: desc,
              room: user,
              from: this.id
            });
            this.room = user;
          });
        })
        .catch(error => {
          this.$q.notify({
            message: error,
            color: "light-blue",
            icon: "announcement"
          });
          this.isCalling = false;
          this.endCall();
        });
    },

    prepareCaller() {
      //Initializing a peer connection
      this.caller = new window.RTCPeerConnection();
      //Listen for ICE Candidates and send them to remote peers
      this.caller.onicecandidate = evt => {
        if (!evt.candidate) return;
        console.log("onicecandidate called");
        this.onIceCandidate(this.caller, evt);
      };
      //onaddstream handler to receive remote feed and show in remoteview video element
      this.caller.onaddstream = evt => {
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
          room: this.room
        });
      }
    },

    endCurrentCall() {
      this.channel.trigger("client-endcall", {
        room: this.room
      });

      this.endCall();
    },

    handleGetMessages(limit) {
      this.isLoading = true;
      // this.messages = [];
      let payload = {
        nextErr: err => {
          console.log("[ERROR] " + err);
          this.isLoading = false;
        },
        nextSuccess: response => {
          this.isLoading = false;
          if (response && isArray(response)) {
            const id = this.store.userProfile.id;
            let tempData = [...response];
            if (this.messages.length > 0) {
              tempData = tempData.slice(this.messages.length);
              tempData.forEach(message => {
                const parseMessage = {
                  id: message.senderId,
                  user: message.senderId === id ? "Me" : message.senderName,
                  message: message.message,
                  sent: message.senderId === id,
                  createdAt: message.createdAt
                };
                this.handlePushMessage(parseMessage, 1);
              });
            } else {
              tempData.reverse().forEach(message => {
                const parseMessage = {
                  id: message.senderId,
                  user: message.senderId === id ? "Me" : message.senderName,
                  message: message.message,
                  sent: message.senderId === id,
                  createdAt: message.createdAt
                };
                this.handlePushMessage(parseMessage);
              });
            }
          }
        },
        limit
      };
      this.getMessageList(payload);
    },

    initMessageBox() {
      // Enable pusher logging - don't include this in production
      Pusher.logToConsole = true;
      const pusherMessage = new Pusher("1bb3ea564162ad9f320a", {
        cluster: "ap1"
      });
      const channelMessage = pusherMessage.subscribe("deftnt-channel");
      channelMessage.bind("chat-message", data => {
        const id = this.store.userProfile.id;
        if (id !== data.id) {
          this.handlePushMessage(data);
          if (Notification.permission === "granted") {
            navigator.serviceWorker.getRegistration().then(reg => {
              let name = data.user;
              if (!name) {
                name = this.messages.find(message => message.id === data.id)
                  .user;
              }
              const options = {
                body: `${name}: ${data.message}`,
                vibrate: [100, 50, 100],
                data: {
                  dateOfArrival: Date.now(),
                  primaryKey: 1
                }
              };
              reg.showNotification("Notification", options);
            });
          }
        }
      });
      if (this.messages.length === 0) {
        this.handleGetMessages(this.limit);
      }
    },

    initCallBox(userId, userName) {
      const pusher = new Pusher("1bb3ea564162ad9f320a", {
        cluster: "ap1",
        encrypted: true,
        authEndpoint: `${API_URL}pusher/auth?userName=${userName}&userId=${userId}`
      });

      const channel = pusher.subscribe("presence-videocall");
      channel.bind("pusher:subscription_succeeded", members => {
        //set the member count
        this.usersOnline = members.count;
        this.id = channel.members.me.id;

        members.each(member => {
          if (member.id != channel.members.me.id) {
            this.users.push(member);
          }
        });
      });

      channel.bind("pusher:member_added", member => {
        this.users.push(member);
      });

      channel.bind("pusher:member_removed", member => {
        // for remove member from list:
        const index = this.users.findIndex(user => user.id === member.id);
        this.users.splice(index, 1);
        if (member.id == this.room) {
          this.endCall();
        }
      });
      this.channel = channel;
      GetRTCIceCandidate();
      GetRTCPeerConnection();
      GetRTCSessionDescription();
      this.prepareCaller();

      channel.bind("client-candidate", async msg => {
        if (msg.room == this.room) {
          await this.caller.addIceCandidate(new RTCIceCandidate(msg.candidate));
        }
      });
      channel.bind("client-endcall", msg => {
        if (msg.room == this.room) {
          this.endCall();
          this.isCalling = false;
        }
      });
      channel.bind("client-sdp", msg => {
        if (msg.room == this.id) {
          const answer = confirm(
            "You have a call from: " + msg.from + "Would you like to answer?"
          );
          if (!answer) {
            return channel.trigger("client-reject", {
              room: msg.room,
              rejected: this.id
            });
          }
          this.isCalling = true;
          this.room = msg.room;
          getCam()
            .then(stream => {
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
              this.caller.createAnswer().then(sdp => {
                this.caller.setLocalDescription(new RTCSessionDescription(sdp));
                channel.trigger("client-answer", {
                  sdp: sdp,
                  room: this.room
                });
              });
            })
            .catch(error => {
              this.$q.notify({
                message: error,
                color: "light-blue",
                icon: "announcement"
              });
              this.isCalling = false;
            });
        }
      });
      channel.bind("client-answer", answer => {
        if (answer.room == this.room) {
          console.log("answer received");
          this.caller.setRemoteDescription(
            new RTCSessionDescription(answer.sdp)
          );
        }
      });

      channel.bind("client-reject", answer => {
        if (answer.room == this.room) {
          console.log("Call declined");
          alert("call to " + answer.rejected + "was politely declined");
          this.endCall();
        }
      });
      this.isInit = true;
    }
  },
  computed: {
    ...mapState({
      store: mapStateToProps
    }),
    messagesFormat() {
      let result = this.messages.map(message => {
        message.timeDuration = processStamp(message.createdAt);
        return message;
      });
      return result;
    }
  },
  watch: {
    limit(newValue) {
      this.handleGetMessages(newValue);
    }
  }
};
</script>
