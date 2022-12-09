import { Meteor } from "meteor/meteor";
import { Rooms } from "/imports/collections";
import { Messages } from "/imports/collections";

Meteor.methods({
  userProfileUpdate(data) {
    Meteor.users.update(
      { username: data[0] },
      { $set: { "profile.avatar": data[1] } }
    );
  },
  userProfileUpdateRoom(data) {
    Rooms.update(
      { lastUserName: data[0] },
      { $set: { lastUserAvatar: data[1] } }
    );
  },
  userProfileUpdateMessages(data) {
    Messages.update({ username: data[0] }, { $set: { userAvatar: data[1] } });
    console.log("working?");
  },
});
