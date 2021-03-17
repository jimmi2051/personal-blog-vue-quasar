<template>
  <div class="video-call">
    <div class="list-video">
      <div id="me"></div>
    </div>

    <div id="remote-container"></div>
    <div class="bottom-bar">
      <i class="fa fa-phone text-red fa-2x" @click="handleLeaveChannelAgora" />
    </div>
  </div>
</template>

<script>
import AgoraRTC from "agora-rtc-sdk";
import { CHANNEL, AGORA_APP_ID, AGORA_CERTIFICATE } from "utils/Constants";
const { RtcTokenBuilder, RtcRole } = require("agora-access-token");

const role = RtcRole.PUBLISHER;
const expirationTimeInSeconds = 3600;

const currentTimestamp = Math.floor(Date.now() / 1000);

const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
const clientAgora = AgoraRTC.createClient({
  mode: "live",
  codec: "vp8"
});
clientAgora.init(AGORA_APP_ID);

// Handle errors.
let handleError = function(err) {
  console.log("Error: ", err);
};
// Add video streams to the container.
function addVideoStream(elementId) {
  const remoteContainer = document.getElementById("remote-container");
  // Creates a new div for every stream
  let streamDiv = document.createElement("div");
  // Assigns the elementId to the div.
  streamDiv.id = elementId;
  streamDiv.className = "margin-center";
  // Takes care of the lateral inversion
  streamDiv.style.transform = "rotateY(180deg)";
  // Adds the div to the container.
  remoteContainer.appendChild(streamDiv);
}

// Remove the video stream from the container.
function removeVideoStream(elementId) {
  let remoteDiv = document.getElementById(elementId);
  if (remoteDiv) remoteDiv.parentNode.removeChild(remoteDiv);
}

// Subscribe to the remote stream when it is published
clientAgora.on("stream-added", function(evt) {
  clientAgora.subscribe(evt.stream, handleError);
});
// Play the remote stream when it is subsribed
clientAgora.on("stream-subscribed", function(evt) {
  let stream = evt.stream;
  let streamId = String(stream.getId());
  addVideoStream(streamId);
  stream.play(streamId);
});
// Remove the corresponding view when a remote user unpublishes.
clientAgora.on("stream-removed", function(evt) {
  let stream = evt.stream;
  let streamId = String(stream.getId());
  stream.close();
  removeVideoStream(streamId);
});
// Remove the corresponding view when a remote user leaves the channel.
clientAgora.on("peer-leave", function(evt) {
  let stream = evt.stream;
  let streamId = String(stream.getId());
  stream.close();
  removeVideoStream(streamId);
});

import { mapState } from "vuex";
function mapStateToProps(state) {
  const userProfile = state.User.userProfile;
  return {
    userProfile
  };
}

export default {
  meta: {
    // sets document title
    title: "Video Call Page",
    titleTemplate: title => `${title} - DefTnt Blog`
  },
  data() {
    return {
      localStream: null
    };
  },
  created: function() {
    const { query } = this.$route;
    const myId = this.store.userProfile.id;
    let { isVideo = "true", channelId = CHANNEL } = query;

    isVideo = Boolean(isVideo === "true");
    if (!this.localStream) {
      this.localStream = AgoraRTC.createStream({
        audio: true,
        video: isVideo
      });
    }

    // if (callingId !== CHANNEL) {
    //   if (isHost) {
    //     channelCalling = `${peerId}${callingId}`;
    //   } else {
    //     channelCalling = `${callingId}${peerId}`;
    //   }
    // }
    const accessToken = this.handleGetTokenAgora(myId, channelId);
    // Join a channel
    clientAgora.join(
      accessToken,
      channelId,
      myId,
      () => {
        // Create a local stream
        // Initialize the local stream
        this.localStream.init(() => {
          // Play the local stream
          this.localStream.play("me");
          // Publish the local stream
          clientAgora.publish(this.localStream, handleError);
        }, handleError);
      },
      handleError
    );
  },
  methods: {
    async handleLeaveChannelAgora() {
      // clientAgora.unpublish(this.localStream);
      // Leave the channel.
      await clientAgora.leave();
      this.localStream.stop();
      this.localStream.close();
      window.close();
    },
    handleGetTokenAgora(userId, channel) {
      const token = RtcTokenBuilder.buildTokenWithUid(
        AGORA_APP_ID,
        AGORA_CERTIFICATE,
        channel,
        userId,
        role,
        privilegeExpiredTs
      );
      return token;
    }
  },
  computed: {
    ...mapState({
      store: mapStateToProps
    })
  },
  destroyed() {
    clientAgora.leave();
    this.localStream.stop();
    this.localStream.close();
  }
};
</script>
