import { Template } from "meteor/templating";
import { Messages } from "/imports/collections";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { ALERT } from "../../ui/alert/alertEvents";
import { PROFILE } from "../../ui/profile/profileEvents";

Template.chatRoomPage.onCreated(function () {
  const roomId = FlowRouter.getParam("_id");

  this.subscribe("chatMsg", roomId);
});

Template.chatRoomPage.onRendered(function () {
  const self = this;
  const roomId = FlowRouter.getParam("_id");

  this.autorun(function () {
    Messages.find({}).count()
    Meteor.call('messageReadUpdate', roomId)
    const scroll = self.find("#scroll-box");
    setTimeout(function () {
      const msg_height = scroll.scrollHeight
      scroll.scrollTo(0, msg_height)
    }, 100)
  })
})

Template.chatRoomPage.helpers({
  list() {
    return Messages.find({});
  },

  text_color(item) {
    const user = Meteor.user();

    if (item.userId !== user._id) {
      return "text-bg-success";
    } else {
      return "bg-warning";
    }
  },

  text_location(item) {
    const user = Meteor.user();

    if (item.userId !== user._id) {
      return "flex-row";
    } else {
      return "flex-row-reverse";
    }
  },

  text_align(item) {
    const user = Meteor.user();

    if (item.userId !== user._id) {
      return "align-items-start";
    } else {
      return "align-items-end";
    }
  },

  text_date(index) {
    const roomId = FlowRouter.getParam('_id')
    const arr = Messages.find({roomId}, {sort: {createdAt: 1}, fields: {userId: true, createdAt: true}}).fetch()

    const alone = arr.length <= 1
    const differ_person = arr[index].userId !== arr[index + 1]?.userId

    if (alone || differ_person) {
      return true
    }

    //같은사람이고 글이 2개이상일떄 아래코드실행
    const timeNow = text_time(arr[index].createdAt)
    const timeNext = text_time(arr[index + 1].createdAt)
    console.log(index)
    console.log(timeNow,timeNext)

    return timeNow !== timeNext
  },

  getDate(date) {
    return text_time(date)
  },
});

function text_time(date) {
  const hours = date.getHours() % 12 ? date.getHours() % 12 : 12;
  const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

  return `${ampm} ${hours}:${minutes} `;
}

Template.chatRoomPage.events({
  "click img": function () {
    const userimage = document.getElementById("imageCheck").src;
    if (Meteor.user) {
      const userAvatar = Meteor.user().profile.avatar;
      const checkUser = Messages.findOne({
        username: Meteor.user().profile.name,
      });
      const dbAvatar = checkUser.userAvatar;
      if (userAvatar === dbAvatar) {
        PROFILE();
      }
    }
  },

  "click .room_back": function () {
    FlowRouter.go("/roomList");
  },

  "click .room_out": function () {
    const roomId = FlowRouter.getParam("_id");
    Meteor.call("roomExit", roomId);
    ALERT("🚀 채팅방을 나가셨습니다!", "Thanks!");
    FlowRouter.go("/roomList");
  },

  'keyup #chat-box': function (evt, ins) {
    let text = ins.find('#chat-box').value
    text = text.replace(/^\s+/, "");

    if (evt.keyCode === 13 && text !== "") {
      chat_room(evt, ins);
    }
  },
});

function chat_room(evt, ins) {
  const user = Meteor.user();
  const username = user.profile.name;
  const avatar = user.profile.avatar;
  const level = user.profile.level;
  let text = ins.find("#chat-box").value;
  const roomId = FlowRouter.getParam("_id");

  text = text.replace(/^\s+/, "");

  const data = {
    roomId: roomId,
    username: username,
    userAvatar: avatar,
    userLevel: level,
    message: text,
  };

  if (text === "" || text === undefined || text === null) {
    return
  }

  Meteor.call('messageInsert', data)
  ins.find('#chat-box').value = ""
}
