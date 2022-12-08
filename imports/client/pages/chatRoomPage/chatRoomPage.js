import { Template } from 'meteor/templating'
import { Messages } from '/imports/collections'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra'

Template.chatRoomPage.onCreated(function () {
  const roomId = FlowRouter.getParam('_id')

  this.subscribe('chatMsg', roomId)
})

Template.chatRoomPage.onRendered(function () {
  const self = this
  const roomId = FlowRouter.getParam('_id')

  this.autorun(function () {
    Messages.find({}).count()
    Meteor.call('messageReadUpdate',roomId)

    const scroll = self.find('#scroll-box')
    setTimeout(function () {
      const msg_height = scroll.scrollHeight
      scroll.scrollTo(0, msg_height)
    }, 100)


  })
})

Template.chatRoomPage.helpers({
  list() {
    return Messages.find({})
  },

  text_color(item) {
    const user = Meteor.user()

    if (item.userId !== user._id) {
      return 'text-bg-success'
    } else {
      return 'bg-warning'
    }
  },

  text_location(item) {
    const user = Meteor.user()

    if (item.userId !== user._id) {
      return 'flex-row'
    } else {
      return 'flex-row-reverse'
    }
  },

  text_align(item) {
    const user = Meteor.user()

    if (item.userId !== user._id) {
      return 'align-items-start'
    } else {
      return 'align-items-end'
    }
  },

  getDate(date) {
    return date.toLocaleString()
  },
})

Template.chatRoomPage.events({
  'click .room_back': function () {
    FlowRouter.go('/roomList')
  },

  'click .room_out': function () {
    const roomId = FlowRouter.getParam('_id')
    Meteor.call('roomExit', roomId)
    FlowRouter.go('/roomList')
  },

  'click .chat_button': function (evt, ins) {
    chat_room(evt, ins)
  },

  'keyup #chat-box': function (evt, ins) {
    let text = ins.find('#chat-box').value
    text = text.replace(/^[\s]+$/, "");

    if (evt.keyCode === 13 && text !== "") {
      chat_room(evt, ins)
    }
  },
})

function chat_room(evt, ins) {
  const user = Meteor.user()
  const username = user.profile.name
  const avatar = user.profile.avatar
  const level = user.profile.level
  let text = ins.find('#chat-box').value
  const roomId = FlowRouter.getParam('_id')

  text = text.replace(/\s/g, "");

  const data = {
    roomId: roomId,
    username: username,
    userAvatar: avatar,
    userLevel: level,
    message: text,
  }

  if (text === '' || text === undefined || text === null) {
    return
  }

  Meteor.call('messageInsert', data)
  ins.find('#chat-box').value = ''
}
