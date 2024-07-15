import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import MainPage from "./pages/MainPage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<MainPage />} />
          <Route path="About" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
