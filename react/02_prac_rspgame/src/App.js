import "./App.css";
import "./HandIcon.css";

import reset from "./assets/ic-reset.svg";
import { useState } from "react";
import HandIcon from "./HandIcon.js";
import HandButton from "./HandButton.js";

// 아래에서 랜덤한거 하랬으니 만들자

const WINS = {
  rock: "scissor",
  scissor: "paper",
  paper: "rock",
};

function random(n) {
  return Math.ceil(Math.random() * n);
}

function rspNum(a, b) {
  if (WINS[a] === b) return 1;
  if (WINS[b] === a) return -1;
  return 0;
}

function randomHand() {
  const num = random(3);
  if (num === 1) {
    return "rock";
  } else if (num === 2) {
    return "scissor";
  } else {
    return "paper";
  }
}

// 승리인지 패배인지 무승부인지 하는 함수 보자
function getResult(winOrLose) {
  if (winOrLose > 0) return "승리";
  if (winOrLose < 0) return "패배";
  return "무승부";
}

function App() {
  // 제일위에다가는 state로 관리해야할것들 생각해보자
  //  내가 낸게 뭔지알아야해, 니껏도
  //우선 몇대몇 점수가 있을꺼고(나,너)
  // 그다음 배점에 있는 input꺼
  // 이겼을때 winner 달아주는거

  const [myChoice, setMyChoice] = useState("rock");
  const [yourChoice, setYourChoice] = useState("rock");
  const [myScore, setMyScore] = useState(0);
  const [yourScore, setYourScore] = useState(0);
  const [bet, setBet] = useState(1);
  const [gameHistory, setGameHistory] = useState([]);
  const [isWin, setIsWin] = useState(0);

  const handleButtonClick = (value) => {
    console.log(value);
    //내가 낸거 먼저 띄워야함
    setMyChoice(value);
    //그다음 상대 랜덤에서 가져와야함
    const otherRandomHand = randomHand();
    setYourChoice(otherRandomHand);
    //그다음 값을 비교해서 승패무 따져야함. 마지막에 승리기록 표기
    const winOrLose = rspNum(value, otherRandomHand);
    setIsWin(winOrLose);
    if (winOrLose === 1) {
      setMyScore(myScore + bet);
    } else if (winOrLose === -1) {
      setYourScore(yourScore + bet);
    }
    const result = getResult(winOrLose);
    setGameHistory([...gameHistory, result]);
  };
  // input 값에서 문자열인거 그리고 베팅할수있게 만들어야지
  const betChange = (e) => {
    let num = Number(e.target.value);
    if (num > 9) num %= 10;
    if (num < 1) num = 1;
    num = Math.floor(num);
    setBet(num);
  };
  // 초기화는 set함수 다 원래대로 하면됌
  const handleClearClick = () => {
    setMyChoice("rock");
    setYourChoice("rock");
    setMyScore(0);
    setYourScore(0);
    setBet(1);
    setGameHistory([]);
    setIsWin(0);
  };
  return (
    <div className="App">
      <div className="App-title">
        <h1 className="App-heading">가위바위보</h1>
        <img src={reset} className="App-reset" onClick={handleClearClick} />
      </div>
      <div className="App-scores">
        <div className="Score">
          <div className="Score-num">{myScore}</div>
          <div className="Score-name">나</div>
        </div>
        <div className="App-versus">:</div>
        <div className="Score">
          <div className="Score-num">{yourScore}</div>
          <div className="Score-name">너</div>
        </div>
      </div>
      <div className="Box App-box">
        {/* 가위바위보 내는곳 */}
        <div className="App-hands">
          <div
            className={`Hand ${isWin == 0 ? "" : isWin == 1 ? "winner" : ""}`}
          >
            <HandIcon className="Hand-icon" value={myChoice} />
          </div>
          <div className="App-versus">VS</div>
          <div
            className={`Hand ${isWin == 0 ? "" : isWin == 1 ? "" : "winner"}`}
          >
            <HandIcon className="Hand-icon" value={yourChoice} />
          </div>
        </div>
        {/* 배점 */}
        <div className="App-bet">
          <span>배점</span>
          <input
            type="number"
            min={1}
            max={9}
            value={bet}
            onChange={betChange}
          />
          <span>배</span>
        </div>
        {/* 기록 */}
        <div className="App-history">
          <h2>승부기록</h2>
          <p>{gameHistory.join(", ")}</p>
        </div>
      </div>
      <HandButton value="rock" onClick={handleButtonClick} />
      <HandButton value="scissor" onClick={handleButtonClick} />
      <HandButton value="paper" onClick={handleButtonClick} />
    </div>
  );
}

export default App;
