import { Template } from 'meteor/templating'
import './roomListPage.html'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra'
import { Rooms, Read } from '/imports/collections'


Template.roomListPage.events({
  'click button[name=btn_search]': function(evt, tmpl) {  //서치 기능은 채팅기능 다 구현되면..해볼 것
    const search_name = tmpl.find('input[name=username]').value
    console.log(search_name)
    tmpl.find('input[name=username]').value = ''
  },

  'click button[name=btn_logout]': function() {
    Meteor.logout()
    alert('로그아웃 완료!')
  },

  'click button[name=btn_new]': function() {

    Meteor.call('roomInsert', (err, room_id) => {
      if (err) {
        alert(err)
      }
      else {
        FlowRouter.go('/chatRoom/' + room_id)
      }
    })

  },

  'click li': function() {
    const room_id = this._id

    Meteor.call('joinerUpdate', room_id)

    FlowRouter.go('/chatRoom/' + room_id)
  }

})

Template.roomListPage.helpers({
  room_list() {
    return Rooms.find({}, { sort: { updatedAt: -1 } })
  },

  getDate(date) {
    return date.toLocaleString()
  },

  // 메세지 읽음 여부 반환
  // todo - undefined ....가 존재
  isRead(room_id) {
    // console.log(Read.find({}).fetch())
    const ms_read = Read.findOne({roomId: room_id})
    console.log('hey', room_id,ms_read)
    // const ms_read = Read.findOne({sort:{lastAt:-1}})
    // console.log(111, ms_read)
    // if (!ms_read) return
    //
    if (ms_read.lastAt >= ms_read.updatedAt) {
      console.log('메세지 다 읽음')
      return true
    }
    else {
      console.log('읽을 메세지 남음')
      return false
    }
  },

  isJoin(joiner) {
    const my_id = Meteor.userId()

    return joiner.includes(my_id) ? '참여중' : '참여하기'  // 삼항연산자

  }
})

Template.roomListPage.onCreated(function() {
  var self = this
  self.roomListSub = self.subscribe('roomList')
  self.messageReadSub = self.subscribe('messageRead',Meteor.userId())
})

Template.roomListPage.onDestroyed(function() {
})

Template.roomListPage.onRendered(function() {
})
