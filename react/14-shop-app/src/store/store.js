import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./products/productsSlice";
import categoriesSlice from "./categories/categoriesSlice";
import productSlice from "./products/productSlice";
import cartSlice from "./cart/cartSlice";
import userSlice from "./user/userSlice";
const store = configureStore({
  reducer: {
    productsSlice,
    categoriesSlice,
    productSlice,
    cartSlice,
    userSlice,
  },
});

export default store;
