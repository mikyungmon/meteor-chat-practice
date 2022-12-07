import { Rooms } from '/imports/collections'

Meteor.methods({
  joinerUpdate(room_id) {
    return Rooms.update({_id:room_id}, {$addToSet: {joiner:this.userId}})
  }
})