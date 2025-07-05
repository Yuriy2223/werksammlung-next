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
export const persistor = persistStore(store);
