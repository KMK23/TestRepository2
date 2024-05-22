const myInput = document.querySelector("#my-input");
const key = document.querySelector("#key");
const code = document.querySelector("#code");
const keydown = document.querySelector("#keydown");
const keypress = document.querySelector("#keypress");
const keyup = document.querySelector("#keyup");

function keypressEvent() {
  keypress.classList.add("check");

  setTimeout(function () {
    keypress.classList.remove("check"), 300;
  });
}

// 키 다운 이벤트

//f1 or f3 안눌리게
function keydownEvent(e) {
  if (e.code == "F1" || e.code == "F3") {
    e.preventDefault();
  }
  //눌린 키에 대한 요소를 가져온다
  const el = document.querySelector(`#${e.code}`);

  //외부 파일에 대한 엘리먼트 접근
  colorArr = [];
  for (let i = 0; i < 3; i++) {
    colorArr.push(parseInt(Math.random() * 256));
  }
  el.style.setProperty("--main-color", `rgb(${colorArr})`);
  el.style.setProperty("--font-color", `black`);

  //keydown div에 check 클래스를 추가한다.
  keydown.classList.add("check");

  //눌린 키를 화면 상에서 회색으로 변경한다.(클래스 적용)
  el.classList.add(`on`);

  //눌린 키의 "key"와 "code"프로퍼티 값을 화면에 적용한다.
  key.innerHTML = `key : ${e.key}`;
  code.innerHTML = `code : ${e.code}`;

  //check 클래스를 0.3초 이후에 제거한다.
  setTimeout(function () {
    keydown.classList.remove("check"), 300;
  });
}

function upkeyEvent(e) {
  //손가락을 뗏을 때의 키 요소를 가져온다.
  document.querySelector(`#${e.code}`);

  //keyup요소에 check 클래스를 추가한다.
  keyup.classList.add("check");

  //손가락을 뗀 키 화면상에서 다시 원상복구 시킨다.(on 클래스 삭제)
  el.classList.remove("on");

  //check 크
}
