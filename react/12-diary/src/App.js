import "./App.css";
import { createContext, useEffect, useReducer, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewPage from "./pages/NewPage";
import {
  // addItem,
  // deleteItem,
  // fetchItems,
  initialState,
  reducer,
  // updateItem,
} from "./api/ItemReducer";
import DiaryPage from "./pages/DiaryPage";
import EditPage from "./pages/EditPage";
import Button from "./components/Button";
import LoginPage from "./pages/LoginPage";
import { getUserAuth } from "./api/firebase";
import { UserInitialState, userReducer } from "./api/userReducer";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  deleteItem,
  fetchItems,
  updateItem,
} from "./store/diarySlice";

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const items = useSelector((state) => state.diary.items);
  const dispatch = useDispatch();

  const [userState, loginDispatch] = useReducer(userReducer, UserInitialState);
  const auth = getUserAuth();
  const [user] = useAuthState(auth);
  // console.log(user);
  //create
  const onCreate = async (values) => {
    const addObj = {
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      date: new Date(values.date).getTime(),
      content: values.content,
      emotion: values.emotion,
      userEmail: user.email,
    };
    dispatch(addItem({ collectionName: "diary", addObj }));
  };

  //read
  useEffect(() => {
    // fetchItems(
    //   "diary",
    //   {
    //     conditions: [
    //       {
    //         field: "userEmail",
    //         operator: "==",
    //         value: user ? user.email : "admin@gmail.com",
    //       },
    //     ],
    //     orderBys: [{ field: "date", direction: "desc" }],
    //   },
    //   dispatch
    // );

    dispatch(
      fetchItems({
        collectionName: "diary",
        queryOptions: {
          conditions: [
            {
              field: "userEmail",
              operator: "==",
              value: user ? user.email : "admin@gmail.com",
            },
          ],
          orderBys: [{ field: "date", direction: "desc" }],
        },
      })
    );
  }, [user]);
  //update
  const onUpdate = async (values) => {
    const updateObj = {
      updatedAt: new Date().getTime(),
      date: new Date(values.date).getTime(),
      content: values.content,
      emotion: values.emotion,
    };
    dispatch(updateItem({ collectionName: "diary", docId, updateObj }));
  };
  //delete
  const onDelete = async (docId) => {
    dispatch(deleteItem({ collectionName: "diary", docId }));
  };
  return (
    <DiaryStateContext.Provider value={{ diaryList: items, auth }}>
      <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
        <BrowserRouter>
          <div className="App">
            {/* <Button text={"로그인"} className="btn_login" onClick={goLogin} /> */}
            <Routes>
              <Route path="/">
                <Route index element={<HomePage />} />
                <Route path="new" element={<NewPage />} />
                <Route path="edit/:id" element={<EditPage />} />
                <Route path="diary/:id" element={<DiaryPage />} />
                <Route path="login" element={<LoginPage />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
