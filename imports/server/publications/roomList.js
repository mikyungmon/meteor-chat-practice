import { Meteor } from 'meteor/meteor'
import { Rooms } from '/imports/collections'

Meteor.publish('roomList', function() {
  return Rooms.find({lastUserID: Meteor?.userId()}, {sort: {updatedAt: -1}})
});