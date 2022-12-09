import { Template } from "meteor/templating";
import { Modal } from "bootstrap";
import { ALERT } from "../alert/alertEvents";
import { Session } from "meteor/session";

Template.profile.events({
  "submit .findPicture": function (event) {
    event.preventDefault();
    const target = event.target;
    const file = target.picture.files[0];
    const reader = new FileReader();
    if (Meteor.userId()) {
      reader.onload = function (e) {
        document.getElementById("preview").src = e.target.result;
      };
      reader.readAsDataURL(file);
      let data = [];
      data[0] = Meteor.user().username;
      data[1] = document.getElementById("preview").src;
      Meteor.call("userProfileUpdate", data);
      // ALERT("PROFILE", "프로필을 저장해주세요!");
      if (Session.get("check") === true) {
        alert("☄️ 프로필이 마음에 드셨다면 저장해주세요 !");
        Session.set("check", false);
      } else {
        alert("Thanks");
      }
    } else {
      alert("등록된 회원이 아닙니다!");
    }
  },
});

export const PROFILE = () => {
  let myModal = new Modal(document.getElementById("Mymodal"), {
    keyboard: false,
  });
  myModal.show();
  Session.set("check", true);
};
