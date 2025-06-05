import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeType } from "../../styles/Theme";

const getInitialTheme = (): ThemeType => {
  return (localStorage.getItem("theme") as ThemeType) || "dark";
};

const initialState = { theme: getInitialTheme() };

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      localStorage.setItem("theme", action.payload);
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
