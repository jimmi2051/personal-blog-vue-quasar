<template>
  <div>
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
    <div
      v-for="(channel, idx) in messagesOpen"
      :key="channel.id"
      class="message-box is-show"
      :style="`right: ${(idx + 1) * 315 + 15}px`"
    >
      <div class="message-box__header">
        <q-avatar>
          <img
            src="https://cdn.quasar.dev/img/avatar1.jpg"
            class="avatar-img"
          />
        </q-avatar>
        <p class="name-user">{{ channel.channel }}</p>
        <button
          @click="handleCloseMessage(channel.id)"
          type="button"
          class="btn-remove"
        >
          <i class="fa fa-times" />
        </button>
      </div>
      <div class="message-box__body" id="message-box__body">
        <div v-if="!isLoading">
          <div
            @click="limit = -1"
            v-if="
              limit !== -1 &&
                messagesFormatVer2[channel.id] &&
                messagesFormatVer2[channel.id].length > 99
            "
            class="message-box__readmore"
          >
            View all messages
          </div>
          <div
            v-for="(message, index) in messagesFormatVer2[channel.id]"
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
          v-model="newMsgToSend[channel.id]"
          class="input-chat"
          type="text"
          placeholder="Enter message here... (/? to get help)"
          @keyup.enter="onSendMessage(channel.id)"
          :disabled="isLoading"
        />
        <button
          :disabled="isLoading"
          type="button"
          @click="onSendMessage(channel.id)"
          class="btn-send"
        >
          <i class="fas fa-paper-plane" />
        </button>
      </div>
    </div>

    <div v-if="isShow" class="message-box is-show">
      <div class="message-box__header" @click="isShow = false">
        <p>Contact</p>
        <i class="fas fa-list custom-i" />
        <i class="fas fa-video custom-i" />
        <i class="fas fa-search custom-i" />
      </div>
      <div class="message-box__users">
        <ul class="list-users">
          <li @click="handleOpenMessage(CHANNEL, 'All Members')">
            <q-avatar size="40px">
              <img
                src="https://cdn3.iconfinder.com/data/icons/online-user-1/120/group-2-512.png"
              />
            </q-avatar>
            <p>
              All Members
            </p>
            <i class="fas fa-circle green" />
          </li>
          <li
            v-for="user in store.users"
            :key="user.id"
            @click="handleOpenMessage(user.id, user.fullname || 'Anonymous')"
          >
            <q-avatar size="40px">
              <img
                src="https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png"
              />
            </q-avatar>
            <p>
              {{ user.fullname || "Anonymous" }}
            </p>
            <i
              v-if="
                users.findIndex(i => i.id === user.id) > -1 ||
                  user.id === store.userProfile.id
              "
              class="fas fa-circle green"
            />
            <i v-else class="fas fa-circle " />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Pusher from "pusher-js"; // import Pusher
import { isArray } from "lodash";
import FetchApi from "utils/FetchApi";
import { CHANNEL } from "utils/Constants";
import { processStamp } from "utils/Helpers";
const API_URL = process.env.VUE_APP_API_URL;
// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;
const pusherMessage = new Pusher("1bb3ea564162ad9f320a", {
  cluster: "ap1"
});
import { mapActions, mapState } from "vuex";
function mapStateToProps(state) {
  const data = state.Message.messageList.data;
  const userProfile = state.User.userProfile;
  const users = state.User.users.data;
  return {
    loading: state.Message.messageList.loading,
    messageList: data,
    userProfile,
    users
  };
}

export default {
  created: function() {
    if (this.store.userProfile.isLogin) {
      this.handleGetUsers();
    }
    const userId = this.store.userProfile.id;
    const userName = this.store.userProfile.fullName;
    this.iniCountUsers(userId, userName);
  },
  data() {
    return {
      messages: [],
      msgToSend: "",
      isShow: false,
      users: [],
      activeBot: true,
      limit: 100,
      isLoading: true,
      messagesOpen: [],
      newMessages: {},
      newMsgToSend: {},
      CHANNEL
    };
  },
  methods: {
    ...mapActions("Message", ["getMessageList"]),
    ...mapActions("User", ["getUsers"]),
    handleOpenMessage(id, channel) {
      const idx = this.messagesOpen.findIndex(msgOpen => msgOpen.id === id);
      if (idx > -1) {
        this.handleRemoveListen(id);
        this.messagesOpen.splice(idx, 1);
      } else {
        this.handleAddListen(id);
        this.messagesOpen.push({ id, channel });
        this.handleGetMessages(id, this.limit);
        if (this.messagesOpen.length > 4) {
          this.messagesOpen.splice(0, 1);
        }
      }
    },
    handleCloseMessage(id) {
      const idx = this.messagesOpen.findIndex(msgOpen => msgOpen.id === id);
      if (idx > -1) {
        this.handleRemoveListen(id);
        this.messagesOpen.splice(idx, 1);
      }
    },
    handleGetUsers() {
      let payload = {
        nextErr: err => {
          console.log("[ERROR] " + err);
          this.isLoading = false;
        },
        nextSuccess: () => {
          this.isLoading = false;
        },
        limit: this.limit
      };
      this.getUsers(payload);
    },
    handlePushMessage(channel, message, type = 0) {
      this.newMsgToSend[channel] = "";
      if (type === 0) {
        if (
          this.newMessages[channel].length &&
          this.newMessages[channel].length > 0
        ) {
          const length = this.newMessages[channel].length;
          const lastestMsg = this.newMessages[channel][length - 1];
          if (lastestMsg && lastestMsg.id === message.id) {
            delete message.user;
          }
        }
        this.newMessages[channel].push(message);
      } else {
        const firstMsg = this.newMessages[channel][0];
        if (firstMsg.id === message.id) {
          delete firstMsg.user;
        }
        this.newMessages[channel].unshift(message);
      }
      this.newMessages = { ...this.newMessages };
    },
    onSendMessage(channelId) {
      // Get ID if empty will init with name & save to local storage
      const id = this.store.userProfile.id;
      let channel = id + channelId;
      if (channelId === CHANNEL) {
        channel = CHANNEL;
      }
      const name = this.store.userProfile.fullname;
      // Case Msg Empty Return
      if (this.newMsgToSend[channelId] === "") {
        this.$q.notify({
          message: "Oops! Sorry, please enter your message.",
          color: "light-blue",
          icon: "announcement"
        });
        return;
      }
      // Case get help
      if (this.newMsgToSend[channelId] === "/?") {
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
        this.handlePushMessage(channelId, messageEnableBot);
        this.handlePushMessage(channelId, messageDisableBot);
        return;
      }
      // Case enable bot
      if (this.newMsgToSend[channelId] === "/bot on") {
        this.activeBot = true;
        const messageEnableBot = {
          id,
          user: "Me",
          message: "Bot have been enabled.",
          sent: true,
          createdAt: Date.now()
        };
        this.handlePushMessage(channelId, messageEnableBot);
        return;
      }
      // Case disable bot
      if (this.newMsgToSend[channelId] === "/bot off") {
        this.activeBot = false;
        const messageDisableBot = {
          id,
          user: "Me",
          message: "Bot have been disabled.",
          sent: true,
          createdAt: Date.now()
        };
        this.handlePushMessage(channelId, messageDisableBot);
        return;
      }
      // Case normal
      const message = {
        id,
        user: "Me",
        message: this.newMsgToSend[channelId],
        sent: true,
        createdAt: Date.now()
      };
      this.handlePushMessage(channelId, message);

      const payload = {
        uri: "send-message",
        params: {
          id,
          user: name,
          message: message.message,
          channel: channel,
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
      }
      this.handleGetUsers();
    },

    handleGetMessages(channel, limit) {
      let channelA;
      let channelB;
      if (channel === CHANNEL) {
        channelA = channelB = channel;
      } else {
        channelA = channel + this.store.userProfile.id;
        channelB = this.store.userProfile.id + channel;
      }
      this.isLoading = true;
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
            if (
              this.newMessages[channel] &&
              this.newMessages[channel].length > 0
            ) {
              tempData = tempData.slice(this.newMessages[channel].length);
              tempData.forEach(message => {
                const parseMessage = {
                  id: message.senderId,
                  user: message.senderId === id ? "Me" : message.senderName,
                  message: message.message,
                  sent: message.senderId === id,
                  createdAt: message.createdAt
                };
                this.handlePushMessage(channel, parseMessage, 1);
              });
            } else {
              this.newMessages[channel] = [];
              tempData.reverse().forEach(message => {
                const parseMessage = {
                  id: message.senderId,
                  user: message.senderId === id ? "Me" : message.senderName,
                  message: message.message,
                  sent: message.senderId === id,
                  createdAt: message.createdAt
                };
                this.handlePushMessage(channel, parseMessage);
              });
            }
          }
        },
        limit,
        channelA,
        channelB
      };
      this.getMessageList(payload);
    },

    handleAddListen(channelId) {
      let channel = this.store.userProfile.id + channelId;
      if (channelId === CHANNEL) {
        channel = CHANNEL;
      }
      const channelMessage = pusherMessage.subscribe(channel);
      channelMessage.bind("chat-message", data => {
        const id = this.store.userProfile.id;
        if (id !== data.id) {
          this.handlePushMessage(channelId, data);
          if (Notification.permission === "granted") {
            navigator.serviceWorker.getRegistration().then(reg => {
              let name = data.user;
              if (!name) {
                name = this.newMessages[channelId].find(
                  message => message.id === data.id
                ).user;
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
        this.handleGetMessages(channelId, this.limit);
      }
    },
    handleRemoveListen(channelId) {
      const channel = this.store.userProfile.id + channelId;
      pusherMessage.unsubscribe(channel);
    },
    iniCountUsers(userId, userName) {
      const pusher = new Pusher("1bb3ea564162ad9f320a", {
        cluster: "ap1",
        encrypted: true,
        authEndpoint: `${API_URL}pusher/auth?userName=${userName}&userId=${userId}`
      });
      const channel = pusher.subscribe("presence-videocall");

      channel.bind("pusher:subscription_succeeded", members => {
        //set the member count
        this.usersOnline = members.count;
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
      });
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
    },
    messagesFormatVer2() {
      const result = {};
      for (let key in this.newMessages) {
        result[key] = this.newMessages[key].map(message => {
          message.timeDuration = processStamp(message.createdAt);
          return message;
        });
      }
      return result;
    }
  }
  // watch: {
  //   limit(newValue) {
  //     this.handleGetMessages(newValue);
  //   }
  // }
};
</script>
