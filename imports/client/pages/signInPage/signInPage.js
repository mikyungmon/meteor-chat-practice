import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import "../../ui/alert/alertEvents.js";
import { ALERT } from "../../ui/alert/alertEvents";

Template.signInPage.onRendered(function () {
  if (localStorage.getItem("userId") === localStorage.getItem("RememberMe")) {
    document.getElementById("flexCheckDefault").checked = true;
  }
});

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
      // todo - 에이든
      //   더 간결한 코드에 도전해볼 수 있을까요?
      //   너무 블럭 깊이가 깊은것 같습니다.
      if (error) {
        ALERT("🚨ERROR", error);
      } else if (is_checked) {
        const userId = Meteor.user().profile.name;
        localStorage.setItem("userId", userId);
        localStorage.setItem("RememberMe", userId);
        FlowRouter.go("/roomList");
      } else {
        localStorage.removeItem("userId");
        FlowRouter.go("/roomList");
      }
    });
  },
});

Template.signInPage.helpers({});

Template.signInPage.onCreated(function () {});

Template.signInPage.onDestroyed(function () {});

Template.signInPage.onRendered(function () {});
