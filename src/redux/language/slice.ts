import { initI18n } from "@/lib/i18n/i18n";
import { Language } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LanguageState {
  currentLanguage: Language;
}

const initialState: LanguageState = {
  currentLanguage: "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.currentLanguage = action.payload;
      initI18n(action.payload);
    },

    switchLanguage: (state) => {
      const languages: Language[] = ["en", "ua", "de"];
      const currentIndex = languages.indexOf(state.currentLanguage);
      const nextLang = languages[(currentIndex + 1) % languages.length];
      state.currentLanguage = nextLang;
      initI18n(nextLang);
    },
  },
});

export const { setLanguage, switchLanguage } = languageSlice.actions;
export const languageReducer = languageSlice.reducer;
