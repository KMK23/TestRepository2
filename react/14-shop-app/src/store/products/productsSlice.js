import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDatas } from "../../firebase";

const initialState = {
  products: [],
  isLoadig: false,
  error: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.isLoadig = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoadig = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoadig = false;
        state.error = action.payload;
      });
  },
});

const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getDatas(collectionName, queryOptions);
      return resultData;
    } catch (error) {
      return null;
    }
  }
);

export default productsSlice.reducer;
export { fetchProducts };
