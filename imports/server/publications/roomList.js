import { Meteor } from 'meteor/meteor'
import { Rooms } from '/imports/collections'

Meteor.publish('roomList', function() {
  return Rooms.find({},{sort: {updatedAt: -1}})
});