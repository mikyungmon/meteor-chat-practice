import {Meteor} from 'meteor/meteor'
import {Messages, Rooms} from '/imports/collections'

Meteor.methods({
  messageInsert(messages) {
    const new_date = new Date()

    messages.createdAt = new_date
    messages.userId = this.userId

    Rooms.update({_id: messages.room_id},
      {
        $set: {
          updatedAt: new_date,
          lastUserId: messages.userId,
          lastUserName: messages.username,
          lastUserAvatar: messages.userAvatar,
          lastMessage: messages.message
        }
      }
    )
    return Messages.insert(messages)
  },
})
