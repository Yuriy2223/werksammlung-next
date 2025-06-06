// import { Language } from "@/types";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface LanguageState {
//   currentLanguage: Language;
// }

// const savedLang = (localStorage.getItem("lang") as Language) || "EN";

// const initialState: LanguageState = {
//   currentLanguage: savedLang,
// };

// const languageSlice = createSlice({
//   name: "language",
//   initialState,
//   reducers: {
//     setLanguage: (state, action: PayloadAction<Language>) => {
//       localStorage.setItem("lang", action.payload);
//       state.currentLanguage = action.payload;
//     },
//     switchLanguage: (state) => {
//       const languages: Language[] = ["EN", "UA", "DE"];
//       const currentIndex = languages.indexOf(state.currentLanguage);
//       const nextLang = languages[(currentIndex + 1) % languages.length];
//       localStorage.setItem("lang", nextLang);
//       state.currentLanguage = nextLang;
//     },
//   },
// });

// export const { setLanguage, switchLanguage } = languageSlice.actions;
// export const languageReducer = languageSlice.reducer;

// import { Language } from "@/types";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface LanguageState {
//   currentLanguage: Language;
// }

// const getInitialLanguage = (): Language => {
//   if (typeof window !== "undefined") {
//     return (localStorage.getItem("lang") as Language) || "en";
//   }
//   return "en";
// };
// // const getInitialLanguage = (): Language => {
// //   if (typeof window !== "undefined") {
// //     const lang = localStorage.getItem("lang")?.toUpperCase();
// //     if (lang === "UA" || lang === "EN" || lang === "en") {
// //       return lang as Language;
// //     }
// //   }
// //   return "en";
// // };

// const initialState: LanguageState = {
//   currentLanguage: getInitialLanguage(),
// };

// const languageSlice = createSlice({
//   name: "language",
//   initialState,
//   reducers: {
//     setLanguage: (state, action: PayloadAction<Language>) => {
//       if (typeof window !== "undefined") {
//         localStorage.setItem("lang", action.payload);
//       }
//       state.currentLanguage = action.payload;
//     },
//     switchLanguage: (state) => {
//       const languages: Language[] = ["en", "ua", "de"];
//       const currentIndex = languages.indexOf(state.currentLanguage);
//       const nextLang = languages[(currentIndex + 1) % languages.length];
//       if (typeof window !== "undefined") {
//         localStorage.setItem("lang", nextLang);
//       }
//       state.currentLanguage = nextLang;
//     },
//   },
// });

// export const { setLanguage, switchLanguage } = languageSlice.actions;
// export const languageReducer = languageSlice.reducer;

import { Language } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LanguageState {
  currentLanguage: Language;
}

const getInitialLanguage = (): Language => {
  if (typeof window !== "undefined") {
    const lang = localStorage.getItem("lang")?.toLowerCase();
    if (lang === "en" || lang === "ua" || lang === "de") {
      return lang;
    }
  }
  return "en";
};

const initialState: LanguageState = {
  currentLanguage: getInitialLanguage(),
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.currentLanguage = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("lang", action.payload);
      }
    },

    switchLanguage: (state) => {
      const languages: Language[] = ["en", "ua", "de"];
      const currentIndex = languages.indexOf(state.currentLanguage);
      const nextLang = languages[(currentIndex + 1) % languages.length];
      state.currentLanguage = nextLang;
      if (typeof window !== "undefined") {
        localStorage.setItem("lang", nextLang);
      }
    },
  },
});

export const { setLanguage, switchLanguage } = languageSlice.actions;
export const languageReducer = languageSlice.reducer;
