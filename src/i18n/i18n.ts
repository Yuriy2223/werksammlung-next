// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";

// import { store } from "../redux/store";
// import { en } from "./locales/en";
// import { ua } from "./locales/ua";
// import { de } from "./locales/de";

// i18n
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     resources: {
//       en: en,
//       de: de,
//       ua: ua,
//     },
//     lng: store.getState().language.currentLanguage,
//     fallbackLng: "en",
//     interpolation: {
//       escapeValue: false,
//     },
//   });

// export default i18n;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { store } from "../redux/store";
import { en } from "../lib/locales/en";
import { ua } from "../lib/locales/ua";
import { de } from "../lib/locales/de";

if (typeof window !== "undefined") {
  import("i18next-browser-languagedetector").then(
    ({ default: LanguageDetector }) => {
      i18n
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
          resources: {
            en: en,
            de: de,
            ua: ua,
          },
          lng: store.getState().language.currentLanguage,
          fallbackLng: "en",
          interpolation: { escapeValue: false },
        });
    }
  );
}

export default i18n;
