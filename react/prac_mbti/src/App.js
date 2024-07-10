import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PracHome from "./pages/PracHome";
import PracNew from "./pages/PracNew";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="" element={<PracHome />} />
          {/* 첫 페이지는 path 대신 index라 적어도 가능 */}
          <Route path="new" element={<PracNew />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
