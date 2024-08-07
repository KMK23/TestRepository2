import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDatasByOrderLimit } from "../api/firebase";
const foodSlice = createSlice({
  name: "food",
  initialState: {
    items: [],
    isLoading: false,
    loadingError: "",
    lastQuery: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        const { resultData, lastQuery } = action.payload;
        state.isLoading = false;
        state.lastQuery = lastQuery;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.isLoading = false;
        state.loadingError = action.payload;
      });
  },
});
const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getDatasByOrderLimit(
        collectionName,
        queryOptions
      );
      return resultData;
    } catch (error) {
      return "fetchItem error" + error;
    }
  }
);

export default foodSlice;
export { fetchItems };
