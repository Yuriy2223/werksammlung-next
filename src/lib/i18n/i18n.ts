// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import { en } from "./locales/en";
// import { ua } from "./locales/ua";
// import { de } from "./locales/de";

// const resources = { en, ua, de };

// if (!i18n.isInitialized) {
//   i18n.use(initReactI18next).init({
//     resources,
//     lng: "en",
//     fallbackLng: "en",
//     interpolation: {
//       escapeValue: false,
//     },
//   });
// }

// export default i18n;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./locales/en";
import { ua } from "./locales/ua";
import { de } from "./locales/de";

const resources = { en, ua, de };

let isInitialized = false;

export const initI18n = (language: string = "en") => {
  if (!isInitialized) {
    i18n.use(initReactI18next).init({
      resources,
      lng: language,
      fallbackLng: "en",
      interpolation: {
        escapeValue: false,
      },
    });
    isInitialized = true;
  } else {
    i18n.changeLanguage(language);
  }
};

export default i18n;

// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
// import { en } from "./locales/en";
// import { ua } from "./locales/ua";
// import { de } from "./locales/de";

// const resources = { en, ua, de };

// if (!i18n.isInitialized) {
//   i18n
//     .use(LanguageDetector)
//     .use(initReactI18next)
//     .init({
//       resources,
//       fallbackLng: "en",
//       interpolation: {
//         escapeValue: false,
//       },
//       detection: {
//         order: ["localStorage", "navigator"],
//         caches: [],
//         // caches: ["localStorage"],
//       },
//     });
// }

// export default i18n;
