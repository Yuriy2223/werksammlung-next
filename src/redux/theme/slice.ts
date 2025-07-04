import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeType } from "../../styles/Theme";

export interface ThemeState {
  theme: ThemeType | null;
}

const initialState: ThemeState = {
  theme: null,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
