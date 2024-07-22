import React from "react";
import Card from "./Card";
import Writer from "./Writer";

function Answer({ state }) {
  console.log(state);
  return (
    <Card>
      <p>{state.answers}</p>
      <div>
        <div>{state.answers}</div>
        <Writer />
      </div>
    </Card>
  );
}

export default Answer;
