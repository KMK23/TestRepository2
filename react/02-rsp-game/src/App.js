import "./App.css";
import reset from "./assets/ic-reset.svg";
import { useState } from "react";
import HandIcon from "./HandIcon.js";
import "./HandIcon.css";
import HandButton from "./HandButton.js";

// 우선 내가 가위바위보중에 하나를 눌러
// 그다음 상대는 랜덤하게 나와
// 그걸 내가 낸거랑 비교를 하고
// 승 패 무를 따져
// 그걸 승부기록에 입력하고
// 그다음 점수는 누적으로 더해져

// const choice = [
//   { id: 1, name: "rock", img: rock },
//   { id: 2, name: "scissor", img: scissor },
//   { id: 3, name: "paper", img: paper },
// ];
// console.log(choice);

function getRandomChoice(choice) {
  const randomIndex = Math.ceil(Math.random() * choice);
  return choice[randomIndex];
}

function rspNumber(my, other) {
  const rspResult = my.id - other.id;
  if (rspResult === 2 || rspResult === -1) {
    return "win";
  } else if (rspResult === 2 || rspResult === -1) {
    return "lose";
  } else {
    return "draw";
  }
}

function App() {
  const [myChoice, setMyChoice] = useState(null);
  const [otherChoice, setOtherChoice] = useState(null);
  const [result, setResult] = useState([]);
  const [score, setScore] = useState({ user: 0, ohter: 0 });

  const handleClick = (select) => {
    const userChoice = select;
    const otherChoice = getRandomChoice();
    const gameResult = rspNumber(myChoice, otherChoice);
    setMyChoice(userChoice);
    setOtherChoice(otherChoice);
    setResult(gameResult);
    if (gameResult === "win") {
      setScore((prev) => ({ ...prev, user: prev.user + 1 }));
    } else if (gameResult === "lose") {
      setScore((prev) => ({ ...prev, other: prev.other + 1 }));
    }
  };
  return (
    <div className="App">
      <h1 className="App-heading">가위바위보</h1>
      <img src={reset} className="App-reset" />
      <div className="App-scores">
        <div className="Score">
          <div className="Score-num">0</div>
          <div className="Score-name">나</div>
        </div>
        <div className="App-versus">:</div>
        <div className="Score">
          <div className="Score-num">1</div>
          <div className="Score-name">너</div>
        </div>
      </div>
      <div className="Box App-box">
        {/* 가위바위보 내는곳 */}
        <div className="App-hands">
          <div className="Hand">
            <HandIcon className="Hand-icon" value="rock" />
          </div>
          <div className="App-versus">VS</div>
          <div className="Hand">
            <HandIcon className="Hand-icon" value="rock" />
            {/* 여기에다 쓴 className 은 우리가 아는 className이 아니고 props 이야 */}
          </div>
        </div>
        {/* 배점 */}
        <div className="App-bet">
          <span>배점</span>
          <input type="number" min={1} max={9} />
          <span>배</span>
        </div>
        {/* 기록 */}
        <div className="App-history">
          <h2>승부기록</h2>
          <p>승리, 패배, 무승부</p>
        </div>
      </div>
      <div>
        <HandButton value="rock" />
        <HandButton value="scissor" />
        <HandButton value="paper" />
      </div>
    </div>
  );
}

export default App;
