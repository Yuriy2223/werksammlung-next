"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTheme } from "@/redux/theme/slice";
import { ThemeType } from "@/styles/Theme";

export const ThemeInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedTheme = (localStorage.getItem("theme") as ThemeType) || "dark";
    dispatch(setTheme(storedTheme));
  }, [dispatch]);

  return null;
};
