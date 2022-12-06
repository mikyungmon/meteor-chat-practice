import { Meteor } from 'meteor/meteor'
import { Rooms,Read } from '/imports/collections'

Meteor.methods({
  roomInsert() {
    const time=new Date
    const roomsData ={
      lastUserId: "",
      lastUserName: "new chat room",
      lastMessage: "새로운 채팅방이 생성되었습니다!",
      updatedAt:time,
      joiner: Array[ this.userId],
    }
    const room_id = Rooms.insert(roomsData)

    Read.insert({
      userId: this.userId,
      roomId: room_id,
      lastAt: time,
      updateAt: time,
    })

    return room_id
  }

})