import "./App.css";
import "./HandIcon.css";

import reset from "./assets/ic-reset.svg";
import { useState } from "react";
import HandIcon from "./HandIcon.js";
import HandButton from "./HandButton.js";

// 승무패 따지기

function App() {
  // input 값에서 문자열인거 그리고 베팅할수있게 만들어야지

  return (
    <div className="App">
      <div className="App-title">
        <h1 className="App-heading">가위바위보</h1>
        <img src={reset} className="App-reset" />
      </div>
      <div className="App-scores">
        <div className="Score">
          <div className="Score-num">5</div>
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
          <p>승리</p>
        </div>
      </div>
      <HandButton value="rock" />
      <HandButton value="scissor" />
      <HandButton value="paper" />
    </div>
  );
}

export default App;
