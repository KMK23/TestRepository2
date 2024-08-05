import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDatas, deleteDatas, getDatas, updateDatas } from "../api/firebase";
const diarySlice = createSlice({
  name: "diary",
  initialState: {
    items: [],
    error: null,
    status: "welcome",
  },
  reducers: {},
  //standard 한 reducer
  extraReducers: (builder) => {
    // 비동기 작업은 actionCreator를 자동으로 만들어주지 못함
    // 그래서 밑에 fetchItems라는걸 만들어준거야

    builder
      .addCase(fetchItems.pending, (state, action) => {
        state.status = "Loading!";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;

        state.status = "complete";
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "fail!";
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.status = "complete";
        console.log(action);
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => {
          return item.docId !== action.payload.docId;
        });
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.items = state.items.map((item) => {
          return item.id == action.payload.id ? action.payload : item;
        });
      });
  },

  //   createAsyncThunk 를 쓰면 fulfilled, rejected, pending 이런게 자동으로 생기는거야

  //standard 하지 않은 reducer(비동기 함수)
});

// 비동기로 사용하는 action을만들어주는 역할이 밑에 createAsync 이거임 dispatch 가 이거라고 생각하면됌
const fetchItems = createAsyncThunk(
  "items/fetchAllItems",
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getDatas(collectionName, queryOptions);
      return resultData;
    } catch (error) {
      console.log("FETCH_ERROR:", error);
    }
  }
);
// 첫번째 파라미터는 type(reducer쓸때 그 type), 두번째는(원래 payload자리)

const addItem = createAsyncThunk(
  "items/addItem",
  async ({ collectionName, addObj }) => {
    try {
      const resultData = await addDatas(collectionName, addObj);
      return resultData;
    } catch (error) {
      console.log("ADD_ERROR:", error);
    }
  }
);

const deleteItem = createAsyncThunk(
  "items/deleteItem",
  async ({ collectionName, docId }) => {
    try {
      const resultData = await deleteDatas(collectionName, docId);
      return resultData;
    } catch (error) {
      console.log("Delete_Error", error);
    }
  }
);

const updateItem = createAsyncThunk(
  "items/updateItem",
  async ({ collectionName, docId, updateObj }) => {
    try {
      const resultData = await updateDatas(collectionName, docId, updateObj);
      return resultData;
    } catch (error) {
      console.log("update_Error", error);
    }
  }
);

export default diarySlice;
export { fetchItems, addItem, deleteItem, updateItem };
