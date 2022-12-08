import { Template } from "meteor/templating";
import { Modal } from "bootstrap";

Template.profile.events({
  "submit .findPicture"(event) {
    event.preventDefault();
    const target = event.target;
    const file = target.picture.files[0];
    const reader = new FileReader();
    // if (Meteor.userId()) {
    reader.onload = function (e) {
      document.getElementById("preview").src = e.target.result;
    };
    reader.readAsDataURL(file);
    const avatar = document.getElementById("preview").src;
    const name = Meteor.userId();
    Meteor.users.update({ _id: name }, { $set: { avatar: avatar } }); //메서드콜 필요
    alert("프로필이 등록되셨습니다!");
    console.log("working");
    // } else {
    //   alert("등록된 회원이 아닙니다!");
    // }
  },
});

export const PROFILE = () => {
  let myModal = new Modal(document.getElementById("Mymodal"), {
    keyboard: false,
  });
  console.log("working?");
  myModal.show();
};

// export const ALERT = (title, value) => {
//   let myModal = new Modal(document.getElementById("alertModal"), {
//     keyboard: false,
//   });
//
//   const Title = document.getElementById("title");
//   const body = document.getElementById("text");
//   Title.innerText = title;
//   body.innerText = value;
//   console.log("working?");
//   myModal.show();
// };
