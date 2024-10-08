import "./App.css";
import logo from "./assets/logo.png";
import { useState } from "react";
import Board from "./Board";

// 함수형 컴포넌트 : 컴포넌트를 함수형으로 만든것(변수형으로도 만들수 있음)
// 함수형 컴포넌트를 만들때 주의해야 할 것 : 반드시 첫글자는 대문자
// 함수형 컴포넌트 안에서는 JSX 문법으로 만든 리액트 엘리먼트를 리턴해줘야 한다.

//던지기 버튼 누르고 랜덤 숫자2개 뽑고 , 그다음에 숫자로 이미지 바꾸고, 각 두 숫자 배열에 넣고(나,상대) 그다음에 배열의 합을 꺼내고 화면에 표시해주면 된다

//ceil 올림 floor 내림 round 반올림
// for ==> htmlFor, onclick/onblur ==> onClick/onBlur

function random(n) {
  return Math.ceil(Math.random() * n);
}

function App() {
  //state
  //던지기 버튼을 누루면 화면에서 주사위 이미지가 바뀌어야 한다
  //순수자바스크립트로 작성한다면 주사위 이미지마다 화면을 만들거나, 혹은 비동기로 화면에 요소를 추가, 삭제하는 코드를 작성해야한다.
  //React 에서는 state 라는것을 사용한다
  //이 state 가 바뀔때마다 리액트가 알아서 화면을 새로 렌더링 해준다.

  const [myNum, setMyNum] = useState(1);
  const [otherNum, setOtherNum] = useState(1);
  // 기록을 관리하는 state는 안만들었어 그래서 만들자 .. 이것들은 기록에 들어갈 state를 관리할 것들이다

  const [gameHistory, setGameHistory] = useState([]);
  const [otherGameHistory, setOtherGameHistory] = useState([]);

  // 리액트에서는 함수 표현식을 더 많이쓴다.
  const handleRollClick = () => {
    //주사위 숫자 뽑아
    const nextMyNum = random(6);
    const nextOtherNum = random(6);

    //기록 추가

    //push는 값이 바뀌는게 아니고 추가만 되는거잖아 그래서 값을 바꾸려면 위에 set이라고 붙인것들을 이용해야해
    // gameHistory.push(nextMyNum);
    // otherGameHistory.push(nextOtherNum);
    setGameHistory([...gameHistory, nextMyNum]);
    setOtherGameHistory([...otherGameHistory, nextOtherNum]);
  };

  const handleClearClick = () => {
    setGameHistory([]);
    setOtherGameHistory([]);
  };

  return (
    <div className="App">
      <div>
        <img src={logo} className="App-logo" />
        <h1 className="App-title">주사위 게임</h1>
        <div>
          <button className="App-btn blue" onClick={handleRollClick}>
            주사위 던지기
          </button>
          <button className="App-btn red" onClick={handleClearClick}>
            처음부터
          </button>
        </div>
      </div>
      <div className="App-boards">
        <Board name="나" color="blue" gameHistory={gameHistory} />
        <Board name="상대" color="red" gameHistory={otherGameHistory} />
      </div>
    </div>
  );
}

export default App;
