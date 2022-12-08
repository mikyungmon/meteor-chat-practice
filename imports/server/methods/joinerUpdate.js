import { Rooms } from '/imports/collections'

Meteor.methods({
  joinerUpdate(room_id) {
    const sel = {_id:room_id}
    const op = {
      $addToSet: {
        joiner:this.userId
      }
    }

    return Rooms.update(sel, op)
  }
})