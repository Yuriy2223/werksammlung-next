// import { Language } from "@/types";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface LanguageState {
//   currentLanguage: Language;
// }

// const getInitialLanguage = (): Language => {
//   if (typeof window !== "undefined") {
//     const lang = localStorage.getItem("lang")?.toLowerCase();
//     if (lang === "en" || lang === "ua" || lang === "de") {
//       return lang;
//     }
//   }
//   return "en";
// };

// const initialState: LanguageState = {
//   currentLanguage: getInitialLanguage(),
// };

// const languageSlice = createSlice({
//   name: "language",
//   initialState,
//   reducers: {
//     setLanguage: (state, action: PayloadAction<Language>) => {
//       state.currentLanguage = action.payload;
//       if (typeof window !== "undefined") {
//         localStorage.setItem("lang", action.payload);
//       }
//     },

//     switchLanguage: (state) => {
//       const languages: Language[] = ["en", "ua", "de"];
//       const currentIndex = languages.indexOf(state.currentLanguage);
//       const nextLang = languages[(currentIndex + 1) % languages.length];
//       state.currentLanguage = nextLang;
//       if (typeof window !== "undefined") {
//         localStorage.setItem("lang", nextLang);
//       }
//     },
//   },
// });

// export const { setLanguage, switchLanguage } = languageSlice.actions;
// export const languageReducer = languageSlice.reducer;

/************без персіста******************* */

import { Language } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LanguageState {
  currentLanguage: Language;
}

const getInitialLanguage = (): Language => {
  if (typeof window !== "undefined") {
    const lang = localStorage.getItem("language");
    try {
      const parsed = JSON.parse(lang || "");
      if (
        parsed?.currentLanguage === "en" ||
        parsed?.currentLanguage === "ua" ||
        parsed?.currentLanguage === "de"
      ) {
        return parsed.currentLanguage;
      }
    } catch {}
  }
  return "en";
};

export const initialState: LanguageState = {
  currentLanguage: getInitialLanguage(),
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.currentLanguage = action.payload;
    },

    switchLanguage: (state) => {
      const languages: Language[] = ["en", "ua", "de"];
      const currentIndex = languages.indexOf(state.currentLanguage);
      const nextLang = languages[(currentIndex + 1) % languages.length];
      state.currentLanguage = nextLang;
    },
  },
});

export const { setLanguage, switchLanguage } = languageSlice.actions;
export const languageReducer = languageSlice.reducer;
