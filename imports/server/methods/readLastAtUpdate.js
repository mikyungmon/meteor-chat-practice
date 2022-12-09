import { Read } from '/imports/collections'

Meteor.methods({
  readLastAtUpdate(room_id, click_time) {
    const sel = {roomId:room_id}
    const op = {lastAt:click_time}

    return Read.update(sel, op)
  }
})