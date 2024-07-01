import React from "react";
import diceBlue1 from "./assets/dice-blue-1.svg";
import diceRed1 from "./assets/dice-red-1.svg";
import Dice from "./Dice";

function Board({ name, color, gameHistory }) {
  //   let diceColor;
  //   if (color == "blue") {
  // diceColor = diceBlue1;
  //   } else {
  // diceColor = diceRed1;
  //   }

  //JSX 문법 쓰는 곳이 아님
  // 그래서 일반 스크립트 영역이라 if 문을 쓸수있음
  //근데 이거 아님 저거니까
  //JSX 문법에다가 삼황연산자 쓰자고
  const sum = gameHistory.reduce(function (acc, cur) {
    return acc + cur;
  }, 0);
  return (
    <div className="App-board">
      <h2>{name}</h2>
      <Dice color={color} num={gameHistory[gameHistory.length - 1]} />
      <h2>총점</h2>
      <p>{sum}</p>
      <h2>기록</h2>
      <p>{gameHistory.join(", ")}</p>
    </div>
  );
}

export default Board;
