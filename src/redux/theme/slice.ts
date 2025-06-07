// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { ThemeType } from "../../styles/Theme";

// export interface ThemeState {
//   theme: ThemeType | null;
// }

// const initialState: ThemeState = {
//   theme: null,
// };

// const themeSlice = createSlice({
//   name: "theme",
//   initialState,
//   reducers: {
//     setTheme: (state, action: PayloadAction<ThemeType>) => {
//       if (typeof window !== "undefined") {
//         localStorage.setItem("theme", action.payload);
//       }
//       state.theme = action.payload;
//     },
//   },
// });

// export const { setTheme } = themeSlice.actions;
// export const themeReducer = themeSlice.reducer;

/*************без персіст*************** */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeType } from "../../styles/Theme";

export interface ThemeState {
  theme: ThemeType | null;
}

const getInitialTheme = (): ThemeType | null => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("theme");
    try {
      const parsed = JSON.parse(saved || "");
      if (parsed === "light" || parsed === "dark" || parsed === "system") {
        return parsed;
      }
    } catch {}
  }
  return null;
};

export const initialState: ThemeState = {
  theme: getInitialTheme(),
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
