import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Language } from "../../App.type";

export interface LanguageState {
  currentLanguage: Language;
}

const savedLang = (localStorage.getItem("lang") as Language) || "EN";

const initialState: LanguageState = {
  currentLanguage: savedLang,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      localStorage.setItem("lang", action.payload);
      state.currentLanguage = action.payload;
    },
    switchLanguage: (state) => {
      const languages: Language[] = ["EN", "UA", "DE"];
      const currentIndex = languages.indexOf(state.currentLanguage);
      const nextLang = languages[(currentIndex + 1) % languages.length];
      localStorage.setItem("lang", nextLang);
      state.currentLanguage = nextLang;
    },
  },
});

export const { setLanguage, switchLanguage } = languageSlice.actions;
export const languageReducer = languageSlice.reducer;
