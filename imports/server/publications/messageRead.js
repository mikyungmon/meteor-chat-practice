import { Meteor } from 'meteor/meteor'
import { Read } from '/imports/collections'

Meteor.publish('messageRead', function(user_id) {

  return Read.find({userId:user_id})
});