// import { useSelector } from "react-redux";
// import { useTranslation } from "react-i18next";
// import { Sun, CloudSun, Cloud, Moon } from "lucide-react";
// import styled from "styled-components";
// import { ThemeType } from "@/styles/Theme";
// import { Button } from "@/shared/Button";
// import { useAppDispatch } from "@/redux/store";
// import { selectTheme } from "@/redux/theme/selectors";
// import { setTheme } from "@/redux/theme/slice";

// const themeOrder: ThemeType[] = ["dark", "grey", "blue", "green"];

// const SwitcherContainer = styled(Button)`
//   span {
//     font-size: 18px;
//     color: ${({ theme }) => theme.svg};
//     transform: translateY(2px);
//   }
// `;

// export const ThemeSwitcher = () => {
//   const { t } = useTranslation();
//   const dispatch = useAppDispatch();
//   const theme = useSelector(selectTheme);
//   const handleThemeChange = () => {
//     const currentIndex = themeOrder.indexOf(theme);
//     const nextTheme = themeOrder[(currentIndex + 1) % themeOrder.length];
//     dispatch(setTheme(nextTheme));
//   };

//   const getThemeIcon = () => {
//     switch (theme) {
//       case "dark":
//         return <Moon />;
//       case "grey":
//         return <Cloud />;
//       case "blue":
//         return <CloudSun />;
//       case "green":
//         return <Sun />;
//       default:
//         return <Sun />;
//     }
//   };

//   return (
//     <SwitcherContainer onClick={handleThemeChange}>
//       {t("buttons.theme")}:<span>{getThemeIcon()}</span>
//     </SwitcherContainer>
//   );
// };

import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Sun, CloudSun, Cloud, Moon } from "lucide-react";
import styled from "styled-components";
import { ThemeType } from "@/styles/Theme";
import { Button } from "@/shared/Button";
import { useAppDispatch } from "@/redux/store";
import { selectTheme } from "@/redux/theme/selectors";
import { setTheme } from "@/redux/theme/slice";
import PageTransitionOverlay from "../Language/PageTransitionOverlay";
import { useState } from "react";

const themeOrder: ThemeType[] = ["dark", "grey", "blue", "green"];

const SwitcherContainer = styled(Button)`
  span {
    font-size: 18px;
    color: ${({ theme }) => theme.svg};
    transform: translateY(2px);
    margin-left: 8px;
  }
`;

export const ThemeSwitcher = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const theme = useSelector(selectTheme);

  const handleThemeChange = () => {
    setIsTransitioning(true);
    const currentIndex = themeOrder.indexOf(theme);
    const nextTheme = themeOrder[(currentIndex + 1) % themeOrder.length];

    setTimeout(() => {
      dispatch(setTheme(nextTheme));
    }, 100);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "dark":
        return <Moon />;
      case "grey":
        return <Cloud />;
      case "blue":
        return <CloudSun />;
      case "green":
        return <Sun />;
      default:
        return <Sun />;
    }
  };

  return (
    <>
      <PageTransitionOverlay active={isTransitioning} />
      <SwitcherContainer onClick={handleThemeChange}>
        {t("buttons.theme")}:<span>{getThemeIcon()}</span>
      </SwitcherContainer>
    </>
  );
};
