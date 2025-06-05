import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
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
import { themeReducer } from "./theme/slice";
import { modalReducer } from "./modal/slice";
import { languageReducer } from "./language/slice";
import { contactReduser } from "./contact/slice";
import { authReducer } from "./auth/slice";

const themePersistConfig = {
  key: "theme",
  storage,
};

const languagePersistConfig = {
  key: "language",
  storage,
};

const persistedThemeReducer = persistReducer(themePersistConfig, themeReducer);
const persistedLanguageReducer = persistReducer(
  languagePersistConfig,
  languageReducer
);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    modal: modalReducer,
    theme: persistedThemeReducer,
    language: persistedLanguageReducer,
    contact: contactReduser,
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
