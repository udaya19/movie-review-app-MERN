import React, { createContext, useEffect } from "react";
const defaultTheme = "light";
const darkTheme = "dark";
export const ThemeContext = createContext();
const ThemeProvider = ({ children }) => {
  const toggleTheme = () => {
    const oldTheme = localStorage.getItem("theme");
    const newTheme = oldTheme === defaultTheme ? darkTheme : defaultTheme;
    document.documentElement.classList.remove(oldTheme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
    window.location.reload(true);
  };
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (!theme) {
      document.documentElement.classList.add(defaultTheme);
    }
    document.documentElement.classList.add(theme);
  }, []);
  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
