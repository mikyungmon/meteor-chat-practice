import { Template } from "meteor/templating";
import { Modal } from "bootstrap";

import "./alert.html";

export const ALERT = (title, value) => {
  let myModal = new Modal(document.getElementById("alertModal"), {
    keyboard: false,
  });

  const Title = document.getElementById("title");
  const body = document.getElementById("text");
  Title.innerText = title;
  body.innerText = value;
  myModal.show();
};

//    ✅특정 메소드 추가 용도 TEST
// export const ALERT2 = () => {
//   let module1 = {
//     name: function (title, value) {
//       let myModal = new Modal(document.getElementById("alertModal"), {
//         keyboard: false,
//       });
//       const element = document.getElementById("text");
//       const Title = document.getElementById("title");
//       element.innerText = value;
//       Title.innerText = title;
//       myModal.show();
//     },
//   };
//   return module1;
// };
