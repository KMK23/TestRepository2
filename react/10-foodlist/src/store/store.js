import { configureStore } from "@reduxjs/toolkit";
import foodListSlice from "./foodListSlice";
const store = configureStore({
  reducer: { foodList: foodListSlice.reducer },
});

export default store;
