import { Meteor } from 'meteor/meteor'
import { Read } from '/imports/collections'

Meteor.methods({
  messageReadInsert(ms_read_data) {
    return Read.insert({ ms_read_data })  // data 넣고 ._id 반환
  }
})