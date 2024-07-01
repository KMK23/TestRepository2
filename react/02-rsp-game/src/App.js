import "./App.css";
import reset from "./assets/ic-reset.svg";

import { useState } from "react";
import paper from "./assets/paper.svg";
import rock from "./assets/rock.svg";
import scissor from "./assets/scissor.svg";
import Rsp from "./Rsp.js";

// 우선 내가 가위바위보중에 하나를 눌러
// 그다음 상대는 랜덤하게 나와
// 그걸 내가 낸거랑 비교를 하고
// 승 패 무를 따져
// 그걸 승부기록에 입력하고
// 그다음 점수는 누적으로 더해져
const choice = [
  { id: 1, name: "rock", img: rock },
  { id: 2, name: "scissor", img: scissor },
  { id: 3, name: "paper", img: paper },
];
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
      <div className="App-titleBox">
        <h1>가위바위보</h1>
        <img src={reset}></img>
      </div>
      <Rsp
        myChoice={myChoice}
        otherChoice={otherChoice}
        score={score}
        result={result}
      />
      <div className="rspBox">
        {choice.map((choice) => (
          <div
            key={choice.id}
            className={choice.name}
            onClick={() => handleClick(choice)}
          >
            <img src={choice.img} className="Img" alt={choice.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
