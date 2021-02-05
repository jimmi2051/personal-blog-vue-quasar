import findIndex from "lodash/findIndex";
import moment from "moment";
export const findPage = (pages, pageName) => {
  const idx = findIndex(pages, page => page.pageName === pageName);
  if (idx > -1) {
    return pages[idx];
  }
  return {};
};
export const findSection = (sections, sectionName) => {
  const idx = findIndex(
    sections,
    section => section.sectionName === sectionName
  );
  if (idx > -1) {
    return sections[idx];
  }
  return {};
};

export const processStamp = timeStamp => {
  const now = moment();
  const sent = moment(timeStamp);
  const timeSub = moment.duration(now.diff(sent));
  const hours = Math.floor(timeSub.asHours());
  const minutes = Math.floor(timeSub.asMinutes());
  const seconds = Math.floor(timeSub.asSeconds());
  const days = Math.floor(timeSub.asDays());
  const weeks = Math.floor(timeSub.asWeeks());
  const months = Math.floor(timeSub.asMonths());
  const years = Math.floor(timeSub.asYears());
  let message = "";
  if (years > 0) {
    message = years > 1 ? `${years} years ago` : `1 year ago`;
  } else if (months > 0) {
    message = months > 1 ? `${months} months ago` : `1 month ago`;
  } else if (weeks > 0) {
    message = weeks > 1 ? `${weeks} weeks ago` : `1 week ago`;
  } else if (days > 0) {
    message = days > 1 ? `${days} days ago` : `1 day ago`;
  } else if (hours > 0) {
    message = hours > 1 ? `${hours} hours ago` : `1 hour ago`;
  } else if (minutes > 0) {
    message = minutes > 1 ? `${minutes} minutes ago` : `1 minute ago`;
  } else {
    message = seconds > 10 ? `${seconds} seconds ago` : `a moment ago`;
  }
  return message;
};

export const GetRTCIceCandidate = () => {
  window.RTCIceCandidate =
    window.RTCIceCandidate ||
    window.webkitRTCIceCandidate ||
    window.mozRTCIceCandidate ||
    window.msRTCIceCandidate;

  return window.RTCIceCandidate;
};

export const GetRTCPeerConnection = () => {
  window.RTCPeerConnection =
    window.RTCPeerConnection ||
    window.webkitRTCPeerConnection ||
    window.mozRTCPeerConnection ||
    window.msRTCPeerConnection;
  return window.RTCPeerConnection;
};

export const GetRTCSessionDescription = () => {
  window.RTCSessionDescription =
    window.RTCSessionDescription ||
    window.webkitRTCSessionDescription ||
    window.mozRTCSessionDescription ||
    window.msRTCSessionDescription;
  return window.RTCSessionDescription;
};

export const getCam = () => {
  //Get local audio/video feed and show it in selfview video element
  return navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  });
};
