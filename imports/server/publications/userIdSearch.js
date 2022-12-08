import { Meteor } from 'meteor/meteor'

Meteor.publish('userIdSearch', function(userName) {
  return Meteor.users.find({username:userName})
});