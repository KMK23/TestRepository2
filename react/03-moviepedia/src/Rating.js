import React from "react";

const RATINGS = [1, 2, 3, 4, 5];

function Star() {
  return <span>★</span>;
}
// 반복문을 쓸때(map) 꼭 key 값을 써줘야해. React 는 고유 key값을 써줘서 뭐가 변하는지 알려줘야해
function Rating(props) {
  return (
    <div>
      {RATINGS.map((arrNum) => (
        <Star key={arrNum} />
      ))}
    </div>
  );
}

export default Rating;
