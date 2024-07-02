import "./App.css";
import HandIcon from "./HandIcon.js";
import reset from "./assets/ic-reset.svg";
import "./HandIcon.css";
import "./HandButton.css";
import HandButton from "./HandButton.js";
import { useState } from "react";
const WINS = {
  rock: "scissor",
  scissor: "paper",
  paper: "rock",
};

function random(n) {
  return Math.ceil(Math.random() * n);
}

function compareHand(a, b) {
  if (WINS[a] === b) return 1;
  if (WINS[b] === a) return -1;
  return 0;
}
function generateRandomHand() {
  const num = random(3);
  if (num === 1) {
    return "rock";
  } else if (num === 2) {
    return "scissor";
  } else {
    return "paper";
  }
}

// 승무패 따지기

function App() {
  const [hand, setHand] = useState("rock");
  const [otherHand, setOtherHand] = useState("rock");
  const [myScore, setMyScore] = useState(0);
  const [otherScore, setOtherScore] = useState(0);
  const [bet, setBet] = useState(1);
  const [gameHistory, setGameHistory] = useState([]);
  const [isWin, setIsWin] = useState(0);

  const handleButtonClick = (value) => {
    // 사용자가 클릭한 묵찌빠를 가져와
    setHand(value);
    // 상대의 묵찌빠 랜덤으로 추출
    const nextOtherHand = generateRandomHand();
    setOtherHand(nextOtherHand);
    // 승 무 패를 따져(값을 비교)
    const comparison = compareHand(value, nextOtherHand);
    setIsWin(comparison);
    if (comparison === 1) {
      setMyScore(myScore + bet);
    }
    if (comparison === -1) {
      setOtherScore(otherScore + bet);
    }
    if (comparison === 0) {
    }
  };

  // input 값에서 문자열인거 그리고 베팅할수있게 만들어야지
  const handleBetChange = (e) => {
    let num = Number(e.target.value);
    if (num > 9) num %= 10;
    if (num < 1) num = 1;
    num = Math.floor(num);
    setBet(num);
  };

  return (
    <div className="App">
      <div className="App-title">
        <h1 className="App-heading">가위바위보</h1>
        <img src={reset} className="App-reset" />
      </div>
      <div className="App-scores">
        <div className="Score">
          <div className="Score-num">{myScore}</div>
          <div className="Score-name">나</div>
        </div>
        <div className="App-versus">:</div>
        <div className="Score">
          <div className="Score-num">{otherScore}</div>
          <div className="Score-name">너</div>
        </div>
      </div>
      <div className="Box App-box">
        {/* 가위바위보 내는곳 */}
        <div className="App-hands">
          <div
            className={`Hand ${isWin == 0 ? "" : isWin == 1 ? "winner" : ""}`}
          >
            <HandIcon value={hand} className="Hand-icon" />
          </div>
          <div className="App-versus">VS</div>
          <div
            className={`Hand ${isWin == 0 ? "" : isWin == 1 ? "" : "winner"}`}
          >
            <HandIcon value={otherHand} className="Hand-icon" />
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
            onChange={handleBetChange}
          />
          <span>배</span>
        </div>
        {/* 기록 */}
        <div className="App-history">
          <h2>승부기록</h2>
          <p>승리</p>
        </div>
      </div>
      <HandButton value="rock" onClick={handleButtonClick} />
      <HandButton value="scissor" onClick={handleButtonClick} />
      <HandButton value="paper" onClick={handleButtonClick} />
    </div>
  );
}

export default App;
