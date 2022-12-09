import { Meteor } from 'meteor/meteor'
import { Rooms } from '/imports/collections'

Meteor.publish('roomList', function(userIds) {
  console.log(1111111, userIds)
  // const sel = userIds? {joiner: { $contains : userIds}} : {}
  const sel = userIds? {joiner: { $in : userIds}} : {}
  console.log(2222222, sel)

  return Rooms.find(sel, {sort: {updatedAt: -1}})
});