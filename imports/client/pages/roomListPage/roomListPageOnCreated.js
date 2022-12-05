import { Template } from 'meteor/templating'

Template.roomListPage.onCreated(function() {
  var self = this;
  self.roomListSub = self.subscribe("roomList",{profession:up})
})
