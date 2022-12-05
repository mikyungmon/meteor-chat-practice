import { Template } from 'meteor/templating'
import './roomListPage.html'

Template.roomListPage.events({
  "click #btn_search": function (evt,tmpl) {
    const search_name = tmpl.find("input[name=username]").value;
    console.log(search_name)
    tmpl.find("input[name=username]").value="";
  },

  "click #btn_logout": function () {
    Meteor.logout();
    alert('로그아웃 완료!')
  }
  //
  // "keyup input": function (evt, tmpl) {
  //   if (evt.which === 13) {
  //
  //     console.log('되고있니')
  //     const search_name = tmpl.find("input[name=username_search]").value;
  //     console.log(search_name)
  //   }
  // },
});
