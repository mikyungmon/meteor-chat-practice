import {Template} from 'meteor/templating'
import {Messages} from '/imports/collections'
import {FlowRouter} from 'meteor/ostrio:flow-router-extra'

Template.chatRoomPage.onCreated(function () {
  const roomId = FlowRouter.getParam("_id")

  this.subscribe("chatMsg", roomId)
});

Template.chatRoomPage.onRendered(function () {
  const self = this
  this.autorun(function () {
    Messages.find({}).count()
    const scroll = self.find("#scroll-box")
    setTimeout(function(){
      const msg_height = scroll.scrollHeight
      scroll.scrollTo(0,msg_height)
    },100)
  })
});

//todo:이거피료할수도있으니 남겨둠
// Template.chatMsg.onDestroyed(function(){
//   const self = this;
//   self.chatMsgSub.stop();
// })

Template.chatRoomPage.helpers({
  list() {
    return Messages.find({})
  },

  text_color(item){
    const user= Meteor.user()

    if(item.userId !== user._id){
      return "text-bg-success"
    }else {
      return "bg-warning"
    }
  },

  text_location(item){
    const user = Meteor.user()

    if(item.userId !== user._id){
      return "align-items-start"
    }else {
      return "align-items-end"
    }
  },

  getDate(date) {
    return date.toLocaleString();
  }
});

Template.chatRoomPage.events({
  "click .room_back": function () {
    FlowRouter.go('/roomList')
  },

  "click .room_out":function(){
    const roomId = FlowRouter.getParam("_id")
    Meteor.call("roomExit", roomId)
    FlowRouter.go('/roomList')
  },

  "click .chat_button": function (e, t) {
    chat_room(e, t)
  },

  'keyup textarea': function (e, t) {
    if (e.which === 13) {
      chat_room(e, t)
    }
  }
})

function chat_room(e, t) {
  const user = Meteor.user();
  const username = user.profile.name
  const level = user.profile.level

  const text = t.find("textarea[name=text]").value
  const roomId = FlowRouter.getParam("_id")

  const data = {
    roomId: roomId,
    userId: user._id,
    username: username,
    userAvatar: "",
    userLevel: level,
    createdAt: new Date(),
    message: text,
  }

  if(text === "" || text === null || text === undefined){
    return
  }else {
    Meteor.call("messageInsert", data)
  }
  t.find("textarea[name=text]").value = ""
}