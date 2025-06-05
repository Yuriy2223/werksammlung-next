import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import { themes, ThemeType } from "../../styles/Theme";
import { selectTheme } from "../../redux/theme/selectors";

export const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const theme = useSelector(selectTheme) as ThemeType;
  return (
    <ThemeProvider theme={themes[theme] || themes.dark}>
      {children}
    </ThemeProvider>
  );
};
