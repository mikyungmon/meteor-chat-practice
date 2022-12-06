import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

const Read = new Mongo.Collection('Read')

if (Meteor.isServer) {
  Read.deny({
    insert() {
      return true
    },
    update() {
      return true
    },
    remove() {
      return true
    },
  })
}

export default Read