import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { ALERT } from "../../ui/alert/alertEvents";

import "./signUpPage.html";
// import { Session } from "../../../../.meteor/local/build/programs/server/assets/packages/session/session";

//함수로 따로 빼서 사진을 base64인코딩하는 작업을 실행합니다
function toBase64(file) {
  return new Promise((res) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => res(reader.result);
    reader.onerror = () => res("");
  });
}

//바로 뜰수있게 🚀
Template.signUpPage.events({
  "click #cancle": async function (event) {
    const file = document.getElementById("PreAvatar").files[0];
    if (file) {
      document.getElementById("preview").src = "";
      document.getElementById("PreAvatar").value = "";
    }
  },
  "change #PreAvatar": async function (event) {
    const file = event.target.files[0];
    const avatar = await toBase64(file);
    document.getElementById("preview").src = avatar;
  },

  "submit #btn-signUp": async function signIn(event) {
    event.preventDefault();
    // todo - 에이든
    //   파일 타입이 이미지가 아닌 경우의 예외 처리를 만들도록 합시다.
    const target = event.target;
    const file = target.pictureCheck.files[0];
    const name = target.name.value;
    const username = target.username.value;
    const email = target.email.value;
    const password = target.password.value;

    if (file) {
      const avatar = await toBase64(file);
      const userInfo = {
        username,
        email,
        password,
        profile: { avatar, name, level: 1 },
      };
      Accounts.createUser(userInfo, function (error) {
        if (error) {
          alert(error);
        } else {
          alert("🚀회원가입 되셨습니다!");
          FlowRouter.go("/signin");
        }
      });
    } else {
      ALERT("Check", "파일을 골라주세요!");
    }

    // <form>에 novalidate라고 속성을 추가하여 부트스트랩에서 제공하는 폼API를 활용하여 유효성검사를 하였습니다!
    const forms = document.querySelectorAll(".needs-validation");

    await Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  },
});

Template.signUpPage.helpers({});

Template.signUpPage.onCreated(function () {});

Template.signUpPage.onRendered(function () {});

Template.signUpPage.onDestroyed(function () {});
