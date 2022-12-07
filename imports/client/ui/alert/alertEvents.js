import { Template } from "meteor/templating";
import { Modal } from "bootstrap";

Template.alert.events({
  "click .btn-alert"() {
    var myModal = new Modal(document.getElementById("Mymodal"), {
      keyboard: false,
    });
    myModal.show();
  },
});

var moduleTest3;

(function (window) {
  var module1 = {
    name: function () {
      alert("module1 in moduleTest3!!");
    },
  };

  moduleTest3 = module1;
})(window);

var moduleTest4 = (function (window) {
  var module1 = {
    name: function () {
      alert("module1 in moduleTest4!!");
    },
  };

  return module1;
})(window);

moduleTest3.name(); //module1 in moduleTest3!!

moduleTest4.name(); //module1 in moduleTest4!!
