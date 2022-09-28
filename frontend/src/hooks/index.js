import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import { AuthContext } from "../context/AuthProvider";
export const useTheme = () => {
  return useContext(ThemeContext);
};

export const useAuth = () => {
  return useContext(AuthContext);
};
