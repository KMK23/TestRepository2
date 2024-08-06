import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDatas,
  deleteDatas,
  getDatasByOrderLimit,
  updateDatas,
} from "../api/firebase";
const foodListSlice = createSlice({
  name: "foodList",
  initialState: {
    items: [],
    error: null,
    // lastQuery: null,
    hasNext: true,
    status: "welcome",
    search: "",
    lastQuery: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.fulfilled, (state, action) => {
        const { resultData, lastQuery } = action.payload;
        state.items = resultData;
        state.lastQuery = lastQuery;
        state.status = "complete";
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.payload;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.status = "complete";
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => {
          return item.id !== action.payload.id;
        });
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const idx = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[idx] = action.payload;
      });
  },
});

const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async ({ collectionName, options }) => {
    try {
      const { resultData, lastQuery } = await getDatasByOrderLimit(
        collectionName,
        options
      );
      console.log(lastQuery);
      return { resultData, lastQuery };
    } catch (error) {
      console.log("FETCH Error", error);
    }
  }
);

const addItem = createAsyncThunk(
  "items/addItem",
  async ({ collectionName, addObj }) => {
    try {
      const resultData = await addDatas(collectionName, addObj);
      return resultData;
    } catch (error) {
      console.log("add error", error);
    }
  }
);

const deleteItem = createAsyncThunk(
  "items/deleteItem",
  async ({ collectionName, docId, imgUrl }) => {
    try {
      const { resultData, message } = await deleteDatas(
        collectionName,
        docId,
        imgUrl
      );
      return { resultData, message };
    } catch (error) {
      console.log("delete error", error);
    }
  }
);

const updateItem = createAsyncThunk(
  "item/updateItem",
  async ({ collectionName, docId, updateObj }) => {
    try {
      const resultData = await updateDatas(collectionName, docId, updateObj);
      return resultData;
    } catch (error) {
      console.log("update error", error);
    }
  }
);
export default foodListSlice;
export { fetchItems, addItem, deleteItem, updateItem };
