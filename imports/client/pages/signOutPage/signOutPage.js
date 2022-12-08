import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.signOutPage.events({});

Template.signOutPage.helpers({});

Template.signOutPage.onCreated(function () {
  Meteor.logout();
  Accounts.onLogout(() => {
    FlowRouter.go("/signin");
  });
});

Template.signOutPage.onDestroyed(function () {});

Template.signOutPage.onRendered(function () {});
