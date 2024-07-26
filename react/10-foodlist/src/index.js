import React from "react";
import ReactDOM from "react-dom/client";

import App from "./components/App";
import { LocaleProVider } from "./contexts/LocaleContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LocaleProVider defaultValue="ko">
    <App />
  </LocaleProVider>
);
