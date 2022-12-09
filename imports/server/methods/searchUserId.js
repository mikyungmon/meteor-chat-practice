import { Meteor } from 'meteor/meteor'

Meteor.methods({
  searchUserId(username) {
    const sel = {username:username}
    const op = {fields:{_id:true}}

    return Meteor.users.find(sel,op).fetch().map(user => user._id)
  }
})