"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store";
import { ThemeWrapper } from "@/components/Theme/ThemeWrapper";
import { GlobalStyles } from "@/styles/GlobalStyles";
import { ToastContainer } from "react-toastify";
import { AppGuard } from "@/components/AppGuard/AppGuard";
import { ThemeInitializer } from "../Theme/ThemeInitializer";
import { LanguageInitializer } from "../Language/LanguageInitializer";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeWrapper>
          <ThemeInitializer />
          <LanguageInitializer />
          <GlobalStyles />
          <AppGuard>{children}</AppGuard>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar
            closeOnClick
            pauseOnHover
            draggable
            pauseOnFocusLoss={false}
            limit={3}
            theme="colored"
          />
        </ThemeWrapper>
      </PersistGate>
    </Provider>
  );
}
