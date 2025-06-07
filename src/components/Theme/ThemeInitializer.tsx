"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "@/redux/theme/slice";
import { selectTheme } from "@/redux/theme/selectors";

export const ThemeInitializer = () => {
  const dispatch = useDispatch();

  const storedTheme = useSelector(selectTheme);

  useEffect(() => {
    if (storedTheme) {
      dispatch(setTheme(storedTheme));
    } else {
      dispatch(setTheme("dark"));
    }
  }, [storedTheme, dispatch]);

  return null;
};

/******************без персіст*************** */

// "use client";

// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { setTheme } from "@/redux/theme/slice";
// import { ThemeType } from "@/styles/Theme";

// export const ThemeInitializer = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const storedTheme = (localStorage.getItem("theme") as ThemeType) || "dark";
//     dispatch(setTheme(storedTheme));
//   }, [dispatch]);

//   return null;
// };
