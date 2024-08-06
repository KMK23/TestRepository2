import React from "react";
import ReactDOM from "react-dom/client";

import App from "./components/App";
import { LocaleProVider } from "./contexts/LocaleContext";
import { Provider } from "react-redux";
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LocaleProVider defaultValue="ko">
    <Provider store={store}>
      <App />
    </Provider>
  </LocaleProVider>
);
