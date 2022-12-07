import { Meteor } from 'meteor/meteor'
import { Read } from '/imports/collections'

Meteor.publish('messageRead', function() {
  return Read.find({userId: Meteor.userId()})
});