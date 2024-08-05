import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  // 사실 무쓸모..ㅠㅠ
  initialState: { plus: 0, minus: 0 },
  reducers: {
    up: (state, action) => {
      // return {...state, ...}
      console.log(action);
      state.plus = state.plus + action.payload;
    },
    down: (state, action) => {
      // return {...state, ...}
      console.log(action);
      state.minus = state.minus - action.payload;
    },
  },
});
// slice 함수는 객체를 받는다.
// store에서 필요로하는건 reducers 안에 있는 reducer

export default counterSlice;
export const { up, down } = counterSlice.actions;
