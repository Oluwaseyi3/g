import { useContext } from "react";
import { ThemeContext as StyledThemeCopntext } from "styled-components";
import { ThemeContext } from "../utils/ThemeContext";
const useTheme = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const theme = useContext(StyledThemeCopntext);
  return { isDark, toggleTheme, theme };
};

export default useTheme;
