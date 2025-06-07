import { configureStore, Reducer } from "@reduxjs/toolkit";
import storage from "../hooks/createWebStorage";
import { useDispatch } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { profileReducer } from "./profile/slice";
import { themeReducer, ThemeState } from "./theme/slice";
import { modalReducer } from "./modal/slice";
import { languageReducer, LanguageState } from "./language/slice";
import { contactReducer } from "./contact/slice";
import { authReducer } from "./auth/slice";

type PersistPartial = {
  _persist: {
    version: number;
    rehydrated: boolean;
  };
};

const themePersistConfig = {
  key: "theme",
  storage,
};

const languagePersistConfig = {
  key: "language",
  storage,
};

const persistedThemeReducer: Reducer<ThemeState & PersistPartial> =
  typeof window !== "undefined"
    ? (persistReducer(themePersistConfig, themeReducer) as unknown as Reducer<
        ThemeState & PersistPartial
      >)
    : (themeReducer as unknown as Reducer<ThemeState & PersistPartial>);

const persistedLanguageReducer: Reducer<LanguageState & PersistPartial> =
  typeof window !== "undefined"
    ? (persistReducer(
        languagePersistConfig,
        languageReducer
      ) as unknown as Reducer<LanguageState & PersistPartial>)
    : (languageReducer as unknown as Reducer<LanguageState & PersistPartial>);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    modal: modalReducer,
    theme: persistedThemeReducer,
    language: persistedLanguageReducer,
    contact: contactReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const persistor =
  typeof window !== "undefined" ? persistStore(store) : null;

/***************без персіста******************* */

// import { configureStore } from "@reduxjs/toolkit";
// import { useDispatch } from "react-redux";
// import { profileReducer } from "./profile/slice";
// import {
//   themeReducer,
//   ThemeState,
//   initialState as themeInitialState,
// } from "./theme/slice";
// import { modalReducer } from "./modal/slice";
// import {
//   languageReducer,
//   LanguageState,
//   initialState as languageInitialState,
// } from "./language/slice";
// import { contactReducer } from "./contact/slice";
// import { authReducer } from "./auth/slice";

// function loadFromLocalStorage<T>(key: string): T | undefined {
//   try {
//     const serializedState = localStorage.getItem(key);
//     if (serializedState === null) return undefined;
//     return JSON.parse(serializedState) as T;
//   } catch (e) {
//     console.warn("Load from localStorage error:", e);
//     return undefined;
//   }
// }

// function saveToLocalStorage<T>(key: string, state: T) {
//   try {
//     const serializedState = JSON.stringify(state);
//     localStorage.setItem(key, serializedState);
//   } catch (e) {
//     console.warn("Save to localStorage error:", e);
//   }
// }

// const preloadedState = {
//   theme: loadFromLocalStorage<ThemeState>("theme") ?? themeInitialState,
//   language:
//     loadFromLocalStorage<LanguageState>("language") ?? languageInitialState,
// };

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     profile: profileReducer,
//     modal: modalReducer,
//     theme: themeReducer,
//     language: languageReducer,
//     contact: contactReducer,
//   },
//   preloadedState,
// });

// store.subscribe(() => {
//   const state = store.getState();
//   saveToLocalStorage("theme", state.theme);
//   saveToLocalStorage("language", state.language);
// });

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
// export const useAppDispatch = () => useDispatch<AppDispatch>();
