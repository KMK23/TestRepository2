import React, { useReducer } from "react";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store";
import { up, down } from "./counterSlice";

// function reducer(state, action) {
//   if (action.type === "up") {
//     return { ...state, value: state.value + action.step };
//   }
//   return state;
// }
// const initialState = { value: 0 };

function Counter() {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const dispatch = useDispatch();
  // const count = useSelector((state) => {
  //   return state.value;
  // });
  const plus = useSelector((state) => {
    return state.plus;
  });
  const minus = useSelector((state) => {
    return state.minus;
  });
  return (
    <>
      <div>
        <button
          onClick={() => {
            // dispatch({ type: "up", step: 2 });
            // dispatch({ type: "counter/up", step: 2 });
            // 여기있는 counter는 slice의 name이다
            // dispatch(counterSlice.actions.up(2));
            dispatch(up(2));
            // console.log(counterSlice);
          }}
        >
          +
        </button>
        {plus}
        {/* {state.value} */}
      </div>
      <div>
        <button
          onClick={() => {
            // dispatch({ type: "up", step: 2 });
            // dispatch({ type: "counter/down", step: 2 });
            // 여기있는 counter는 slice의 name이다
            // dispatch(counterSlice.actions.up(2));
            dispatch(down(2));
            // console.log(counterSlice);
          }}
        >
          -
        </button>
        {minus}
        {/* {state.value} */}
      </div>
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Counter></Counter>
      </div>
    </Provider>
  );
}

export default App;
