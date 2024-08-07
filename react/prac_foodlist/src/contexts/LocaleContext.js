import { createContext, useState, useContext } from "react";
export const LocaleContext = createContext();

export function LocaleProVider({ defaultValue = "ko", children }) {
  const [locale, setLocale] = useState(defaultValue);
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("반드시 LocaleProvier 안에서 사용해야 합니다.");
  }
  return context.locale;
}
export function useSetLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("반드시 LocaleProvier 안에서 사용해야 합니다.");
  }
  return context.setLocale;
}
