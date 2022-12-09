import { Template } from "meteor/templating";
import "./roomListPage.html";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { Read, Rooms } from "/imports/collections";

Template.roomListPage.events({
  'click button[name=btn_search]': function(evt, tmpl) {  //서치 기능은 채팅기능 다 구현되면..해볼 것
    const search_name = tmpl.find('input[name=username]').value

    Meteor.call('searchUserId', search_name, function(err, result_id){
      Session.set("userIds", result_id);
      console.log(Session.get('userIds'))
    })
    // const arr = Meteor.users.find({}).fetch().filter(function(user) {return user._id !== Meteor.userId()})
    //
    // console.log('id:', arr)
    // console.log('event:', Session.get('searchName'))
  },

  'click button[name=btn_logout]': function() {
    FlowRouter.go('/signout')
  },

  'click button[name=btn_new]': function() {
    Meteor.call('roomInsert', (err, room_id) => {
      err ? alert(err) : FlowRouter.go('/chatRoom/' + room_id)
    })
  },

  "click li": function () {
    const room_id = this._id;
    const click_time = new Date()
    Meteor.call('joinerUpdate', room_id)
    Meteor.call('readLastAtUpdate', room_id, click_time)
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
    return (join_bool === "참여중") ? true : false
  },

  isRead(room_id){
    const ms_read = Read.findOne({ roomId: room_id })
    const rooms_data = Rooms.findOne({ _id: room_id })

    return (ms_read?.lastAt <= rooms_data.updatedAt) ? true : false

  },

  isJoin(joiner) {
    const my_id = Meteor.userId();

    return joiner.includes(my_id) ? "참여중" : "참여하기"; // 삼항연산자
  }

})

Template.roomListPage.onCreated(function() {
  const instance = this
  this.subscribe('messageRead', Meteor.userId())
  this.subscribe('userIdSearch', Session.get('userIds'))
  this.autorun(function(){
    instance.subscribe('roomList', Session.get('userIds'), function(){
      // console.log(11111, Session.get('userIds'))
      // const id = Meteor.users.find({}).fetch().filter(function(user) {return user._id})
      // console.log('id', id)
      // // 검색한 이름이 내 이름이 아닐 때
      // if(Session.get('searchName') != Meteor.userId()) {
      //   const id = Meteor.users.find({}).fetch().filter(function(user) {return user._id !== Meteor.userId()})
      //   console.log('id:', id)
      // }
      // else{
      //   const id = Meteor.users.find({}).fetch().filter(function(user) {return user._id !== Meteor.userId()})
      // }
    })
  })

})


Template.roomListPage.onDestroyed(function () {});

Template.roomListPage.onRendered(function () {});
