import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCart, deleteDatas } from "../../firebase";

const initialState = {
  products: localStorage.getItem("cartProducts")
    ? JSON.parse(localStorage.getItem("cartProducts"))
    : [],
  totalPrice: 0,
  userId: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.products.push({
        ...action.payload,
        quantity: 1,
        total: action.payload.price,
      });
      localStorage.setItem("cartProducts", JSON.stringify(state.products));
    },
    deleteFromCart: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      localStorage.setItem("cartProducts", JSON.stringify(state.products));
    },

    getTotalPrice: (state) => {
      state.totalPrice = state.products.reduce(
        (acc, product) => (acc += product.total),
        0
      );
    },
    incrementProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload
      );
      state.products[index].quantity += 1;
      state.products[index].total += state.products[index].price;
    },
    degrementProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload
      );
      state.products[index].quantity = state.products[index].quantity - 1;
      state.products[index].total =
        state.products[index].total - state.products[index].price;
    },
  },
});

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ collectionName, productId }, thunkAPI) => {
    try {
      const resultData = await deleteDatas(collectionName, productId);
      if (resultData) {
        thunkAPI.dispatch(deleteFromCart(productId));
        //순서 1번 이게 끝나면 나머지 위에 deleteCartItem 이 실행되는것
      }
    } catch (error) {
      return thunkAPI.rejectWithValue("Error Delete CartItem");
      // rejected 일때 원래 위에 쓰는것들이 여기서 써버리면 위에다가 builder를 써서 위에 써버려야해.
    }
  }
);

export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async ({ collectionName, product }, thunkAPI) => {
    // const resultData = await addDatas();
    try {
      await thunkAPI.dispatch(addToCart(product));
      const {
        cartSlice: { products },
      } = thunkAPI.getState();
      // const products = thunkAPI.getState().cartSlice
      const addItem = products.find(
        (sliceProduct) => sliceProduct.id === product.id
      );
      console.log(addItem);
      await addCart(collectionName, addItem);
    } catch (error) {}
  }
);

export default cartSlice.reducer;
export const {
  addToCart,
  getTotalPrice,
  incrementProduct,
  degrementProduct,
  deleteFromCart,
} = cartSlice.actions;
