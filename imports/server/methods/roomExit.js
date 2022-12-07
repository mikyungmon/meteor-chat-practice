import {Meteor} from "meteor/meteor";
import {Rooms} from "/imports/collections";

Meteor.methods({
  roomExit(roomId) {
    return Rooms.update({_id:roomId},{$pull:{joiner:this.userId}})
  },

})