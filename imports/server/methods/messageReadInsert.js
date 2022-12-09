import {Meteor} from 'meteor/meteor'
import {Read, Messages} from '/imports/collections'

Meteor.methods({
  messageReadInsert(ms_read_data) {
    return Read.insert({ms_read_data})  // data 넣고 ._id 반환
  },
  messageReadUpdate(roomId) {

    const selector1 = { roomId }
    const option1 = { sort: {createdAt: -1} }

    const last_message = Messages.findOne(selector1, option1)

    if(!last_message){
      return
    }

    const selector2 = {userId: this.userId, roomId}
    const option2 = {
      $set: {
        lastAt: last_message.createdAt
      }
    }

    return Read.update(selector2, option2)
  }
})
