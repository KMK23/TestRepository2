import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import Home from "./components/Home";
import MainPage from "./pages/MainPage";
import { GlobalStyle } from "./theme/GlobalStyle";
import { ThemeChangeProvider } from "./context/ThemeContext";
function App() {
  return (
    <BrowserRouter>
      <ThemeChangeProvider>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<MainPage />} />
            {/* path=''라고 써도 되지만 index라고 써도 됌 */}
            <Route path="about" element={<AboutPage />} />
          </Route>
        </Routes>
      </ThemeChangeProvider>
    </BrowserRouter>
  );
}

export default App;
