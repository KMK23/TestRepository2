import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "PLUS":
      return { count: state.count + 1 };
    case "MINUS":
      return { count: state.count - 1 };

    default:
      return state;
  }
}

// reducer를 쓰는 이유 =>
// 1) 예측 가능(상태 변경이 예측 가능하고 일관성 있게 이루어진다.)
// 2) 중앙 집중화된 관리 : 여러 상태를 하나의 리듀서에서 관리를 하거나,
//    여러 리듀서를 조합하여 관리를 할수 있다. 모든 상태 변경이 하나의
//    통로(dispatch를 통한 액션 전달) 상태 관리의 복잡성이 줄어들고,
//    상태 변경이 어디에서 이루어 지는지를 쉽게 추적 할수있다.
const initialState = { count: 0 };

function ReducerTest() {
  // let [count, setCount] = useState(0);
  // const handlePlus = () => {
  //   setCount(count + 1);
  // };
  // const handleMinus = () => {
  //   setCount(count - 1);
  // };

  // const [state, dispatch] = useReducer(리듀서함수, state의 초기값)
  const [state, dispatch] = useReducer(reducer, initialState);
  // state에는 {count : 0} 이라는 초기값이 담긴다

  return (
    <div className="App">
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "PLUS" })}>plus</button>
      {/* action 객체를 넘겨주고 type을 써준다 */}
      <button onClick={() => dispatch({ type: "MINUS" })}>minus</button>
    </div>
  );
}

export default ReducerTest;
