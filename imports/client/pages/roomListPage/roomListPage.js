import { Template } from "meteor/templating";
import "./roomListPage.html";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { Read, Rooms } from "/imports/collections";
import { ALERT } from "../../ui/alert/alertEvents";

Template.roomListPage.events({
  'click button[name=btn_search]': function(evt, tmpl) {  //서치 기능은 채팅기능 다 구현되면..해볼 것
    const search_name = tmpl.find('input[name=username]').value
    Session.set("searchName", search_name);
    // Meteor.call('searchUserId', search_name, function(err, result_id){
    //   Session.set("userIds", result_id);
    //   console.log(Session.get('userIds'))
    // })
  },

  "click button[name=btn_logout]": function () {
    FlowRouter.go("/signout");
  },

  "click button[name=btn_new]": function () {
    Meteor.call("roomInsert", (err, room_id) => {
      // todo - 주석 풀기
      // err ? alert(err) : FlowRouter.go("/chatRoom/" + room_id);
      // ALERT("🚀채팅방이 생성되셨습니다.", "Welcome Your Room!");
    });
  },

  "click li": function () {
    const room_id = this._id;
    const click_time = new Date()
    Meteor.call('joinerUpdate', room_id)
    Meteor.call('readLastAtUpdate', room_id, click_time)
    ALERT("🚀채팅방에 입장하셨습니다", "Welcome Room!");
    FlowRouter.go('/chatRoom/' + room_id)
  }
});

Template.roomListPage.helpers({
  room_list() {
    return Rooms.find({}, { sort: { updatedAt: -1 } });
  },

  getDate(date) {
    return date.toLocaleString();
  },

  isJoinRead(join_bool) {
    return join_bool === "참여중" ? true : false;
  },

  isRead(room_id) {
    const ms_read = Read.findOne({ roomId: room_id });
    const rooms_data = Rooms.findOne({ _id: room_id });

    return (ms_read.lastAt) <= (rooms_data.updatedAt) ? true : false;
  },

  isJoin(joiner) {
    const my_id = Meteor.userId();

    return joiner.includes(my_id) ? "참여중" : "참여하기"; // 삼항연산자
  }

})

Template.roomListPage.onCreated(function() {
  this.subscribe('roomList')
  this.subscribe('messageRead', Meteor.userId())

})

Template.roomListPage.onDestroyed(function () {});

Template.roomListPage.onRendered(function () {});
