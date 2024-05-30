//박스들(div) 4개 , imgbox
//노드리스트 필요. 왜나면 박스를 가져와서 반복문을 돌려야 하기 때문에
const boxes = document.querySelectorAll(".box");
const imgbox = document.querySelector(".imgBox");

// drag - 자신이 드래그 중일 때
// dragstart - 자신이 드래그를 시작했을 때
// dragend - 자신이 드래그를 종료했을 때

// dragenter - 자신의 영역에 드래그가 들어왔을 때
// dragleave - 자신의 영역에서 드래그가 벗어낫을 때
// dragover - 자신의 영역에서 드래그가 일어나고 있을 때 - 필수

// drop - 자신의 영역에서 드래그가 종료 됐을 때 - 필수
boxes.forEach((box) => {
  box.addEventListener("dragover", (e) => {
    console.log(`over : ${e.currentTarget.classList.value}`);
    e.preventDefault();
    //마우스가 옮겨지는 부분에 hovered 라는 class 를 달아줄거야.
    e.currentTarget.classList.add("hovered");
  });
  //dragleave를 써서 자신의 영역에서 벗어난 놈이 점선이 빠져야한다.
  // (다른 박스에 점선을 없애기 위해 class를 빼준다.)
  box.addEventListener("dragleave", (e) => {
    e.currentTarget.classList.remove("hovered");
  });
  // 마지막 사진이 옮겨지고 다른쪽에 class 뺴서 점선 빼주기
  box.addEventListener("drop", (e) => {
    e.currentTarget.classList.remove("hovered");
    e.currentTarget.append(imgbox);
  });
});
