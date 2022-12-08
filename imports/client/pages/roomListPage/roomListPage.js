import { Template } from "meteor/templating";
import "./roomListPage.html";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { Read, Rooms } from "/imports/collections";

Template.roomListPage.events({
  'click button[name=btn_search]': function(evt, tmpl) {  //서치 기능은 채팅기능 다 구현되면..해볼 것
    const search_name = tmpl.find('input[name=username]').value
    console.log(search_name)
    Session.set("searchName", search_name);
    tmpl.find('input[name=username]').value = ''
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

    Meteor.call('joinerUpdate', room_id)
    FlowRouter.go('/chatRoom/' + room_id)

  },
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
  },

  // SearchID(){
  //   const user_id = Meteor.user().findOne({ roomId: room_id })
  // },

  isIncludeRoom(joiner){
    const name = Session.get('searchName')
    // if(joiner.includes(join))
  }

})

Template.roomListPage.onCreated(function() {
  self.roomListSub = this.subscribe('roomList')
  self.messageReadSub = this.subscribe('messageRead', Meteor.userId())
  // self.SearchUserIdSub = this.subscribe('userIdSearch')
})


Template.roomListPage.onDestroyed(function () {});

Template.roomListPage.onRendered(function () {});
