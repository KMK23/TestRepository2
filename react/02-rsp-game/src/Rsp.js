import React from "react";
// import paper from "./assets/paper.svg";
// import rock from "./assets/rock.svg";
// import scissor from "./assets/scissor.svg";
import winner from "./assets/yellow-win.svg";
import lose from "./assets/yellow.svg";

function Rsp({ myChoice, otherChoice, score, result }) {
  return (
    <div>
      <div className="pointBox">
        <div className="myPoint box">
          <h1 className="point">5</h1>
          <p className="that">나</p>
        </div>
        <div className="qt">:</div>
        <div className="otherPoint box">
          <h1 className="point">1</h1>
          <p className="that">상대</p>
        </div>
      </div>
      <div className="rspVerBox">
        <div className="myRSP">
          <img src={myChoice ? winner : lose} />
          <img src={myChoice ? myChoice.img : ""} className="myChoice" />
          <h1>VS</h1>
        </div>
        <div className="otherRSP">
          <img src={otherChoice ? lose : winner} alt="Result" />
          <img
            src={otherChoice ? otherChoice.img : ""}
            className="otherChoice"
          />
        </div>
      </div>
      <div className="resultBox">
        <h3>승부기록</h3>
        <h4></h4>
      </div>
    </div>
  );
}

export default Rsp;
