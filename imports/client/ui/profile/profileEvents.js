import { Template } from "meteor/templating";
import { Modal } from "bootstrap";

// db.people.update( { name: "Abet" }, { $set: { age: 20 } } )

Template.profile.events({
  "submit .findPicture"(event) {
    event.preventDefault();
    const target = event.target;
    const file = target.picture.files[0];
    const reader = new FileReader();
    if (Meteor.userId()) {
      reader.onload = function (e) {
        document.getElementById("preview").src = e.target.result;
      };
      reader.readAsDataURL(file);
      const avatar = document.getElementById("preview").src;
      const name = Meteor.userId();
      Meteor.users.update({ _id: name }, { $set: { avatar: avatar } }); //메서드콜 필요
      console.log("working");
    } else {
      alert("등록된 회원이 아닙니다!");
    }
  },
  "click .btn-profile"() {
    var myModal = new Modal(document.getElementById("Mymodal"), {
      keyboard: false,
    });
    myModal.show();
  },
});
