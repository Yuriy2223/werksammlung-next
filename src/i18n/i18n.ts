import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { store } from "../redux/store";
import { en } from "./locales/en";
import { ua } from "./locales/ua";
import { de } from "./locales/de";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      EN: en,
      DE: de,
      UA: ua,
    },
    lng: store.getState().language.currentLanguage,
    fallbackLng: "EN",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
