import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
// import "./signInPage.html"

Template.signInPage.helpers({
  rememberId() {
    return localStorage.getItem("userId");
  },
});

Template.signInPage.events({
  "submit #btn-signIn": function login(event) {
    event.preventDefault();

    const target = event.target;
    const id = target.id.value;
    const password = target.password.value;
    // const userId = Meteor.user().profile.name;

    //체크박스
    const checkbox = document.getElementById("flexCheckDefault");
    const is_checked = checkbox.checked;

    Meteor.loginWithPassword(id, password, function (error) {
      if (error) {
        alert(error);
      } else {
        alert("🚀로그인완료");
        // FlowRouter.go("/")
        if (is_checked) {
          //아이디기억 로컬스토리지로 설정
          const userId = Meteor.user().profile.name;
          localStorage.setItem("userId", userId);
        } else {
          localStorage.removeItem("userId");
        }
      }
    });
  },
});

Template.signInPage.helpers({});

Template.signInPage.onCreated(function () {});

Template.signInPage.onDestroyed(function () {});

Template.signInPage.onRendered(function () {});
