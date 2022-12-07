import { Template } from 'meteor/templating'
import './roomListPage.html'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra'
import { Rooms, Read } from '/imports/collections'

//주석 ver.
Template.roomListPage.events({
  'click button[name=btn_search]': function(evt, tmpl) {  //서치 기능은 채팅기능 다 구현되면..해볼 것
    const search_name = tmpl.find('input[name=username]').value
    console.log(search_name)
    tmpl.find('input[name=username]').value = ''
  },

  'click button[name=btn_logout]': function() {   // 로그아웃 버튼
    Meteor.logout()
    alert('로그아웃 완료!')
  },

  'click button[name=btn_new]': function() {    // 새 채팅방 만들기 버튼
    console.log('new chat')

    Meteor.call('roomInsert', (err, room_id) => {
      if (err) {
        alert(err)
      }
      else {
        console.log(room_id)
        FlowRouter.go('/chatRoom/' + room_id)
      }
    })
  },

  'click li': function() {
    // console.log(this)  //this.id가 undefined 인데..? --> {{#with}} 사용해서 해결
    FlowRouter.go('/chatRoom/' + this._id)    // chatroom + 방의 ._id
  },

  'click button[name=btn_out]': function() {  // 채팅방 나가기 버튼
    console.log('채팅방 나가기')
  },

  //
  // "keyup input": function (evt, tmpl) {
  //   if (evt.which === 13) {
  //
  //     console.log('되고있니')
  //     const search_name = tmpl.find("input[name=username_search]").value;
  //     console.log(search_name)
  //   }
  // },
})

Template.roomListPage.helpers({
  // 최신순으로 Rooms 정렬
  room_list() {
    return Rooms.find({}, { sort: { updatedAt: -1 } })
  },

  // 시간 변경
  getDate(date) {
    return date.toLocaleString();
  },

  // 메세지 읽음 여부 반환
  ms_read(room_id) {
    console.log(22222, Read.findOne({roomId: room_id}))
    // const ms_read = Read.findOne({userId: Meteor.userId(), roomId: room_id })
    // const ms_read = Read.findOne({sort:{lastAt:-1}})
    // console.log(111, ms_read)
    // if (!ms_read) return
    //
    // if (ms_read.lastAt >= ms_read.updatedAt) {
    //   console.log('메세지 다 읽음')
    //   return true
    // }
    // else {
    //   console.log('읽을 메세지 남음')
    //   return false
    // }
  },
})

// todo - 미사용 상태라 파일 합치면서 주석 처리 했습니다. 확인 필요합니다.
Template.roomListPage.onCreated(function() {
  var self = this;
  self.roomListSub = self.subscribe("roomList")
  self.messageReadSub = self.subscribe("messageRead")
})

Template.roomListPage.onDestroyed(function() {
})

Template.roomListPage.onRendered(function() {
})
