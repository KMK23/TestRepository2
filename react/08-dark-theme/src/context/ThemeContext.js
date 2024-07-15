import { createContext, useContext, useEffect, useState } from "react";
import { darkTheme, lightTheme } from "../theme/theme";
import { ThemeProvider as StyledProvider } from "styled-components";
import { getSunsetRiseData } from "../api/getLocationData";
import { getTimes } from "../utils/getDateData";

const ThemeContext = createContext();
// context 는 전역공간이라고 생각하면 된다.
// 그래서 전역공간을 지금 만들었어(1번)

function ThemeChangeProvider({ children }) {
  // 일몰시간 불러오는 API
  // 결과값을 가지고 조건문으로 light냐 dark냐
  // 이렇게 해서 일몰시간에 맞추어 바꿀수도 있음

  const localTheme = localStorage.getItem("theme") || "light";
  const [themeMode, setThemeMode] = useState(localTheme);
  const themeObject = themeMode === "light" ? lightTheme : darkTheme;

  const [locationData, setLocationData] = useState({});
  // console.log(themeObject);

  const handleLoad = async () => {
    const data = await getSunsetRiseData();
    const { sunrise, sunset } = data;
    const currentTime = getTimes();
    //light 테마 적용
    if (
      currentTime > Number(sunrise.trim()) &&
      currentTime < Number(sunset.trim())
    ) {
      setThemeMode("light");
    } else {
      setThemeMode("dark");
    }

    setLocationData(data);
  };
  console.log(locationData);
  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      <StyledProvider theme={themeObject}>{children}</StyledProvider>
      {/* 원래는 themeContext 처럼 StyledContext 하고 어쩌고 저쩌고 써야하는데 그냥 컴포넌트 하나로 만들어 놨어 그래서 그냥 Context 하나가 더 만들어 졌다고 생각하면 된다 */}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  const { themeMode, setThemeMode } = context;

  const toggleTheme = () => {
    if (themeMode === "light") {
      setThemeMode("dark");
    } else {
      setThemeMode("light");
    }
  };

  return [themeMode, toggleTheme];
}

export { ThemeChangeProvider, useTheme };
