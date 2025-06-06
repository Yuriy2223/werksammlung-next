"use client";

import "@/lib/i18n";
import { ReactNode } from "react";
import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
import {
  // persistor,
  store,
} from "@/redux/store";
import { ThemeWrapper } from "@/components/Theme/ThemeWrapper";
import { GlobalStyles } from "@/styles/GlobalStyles";
import { ToastContainer } from "react-toastify";
import { AppGuard } from "@/components/AppGuard";
import { ThemeInitializer } from "./ThemeInitializer";

export function Providers({ children }: { children: ReactNode }) {
  const content = (
    <ThemeWrapper>
      <ThemeInitializer />
      <GlobalStyles />
      <AppGuard>{children}</AppGuard>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
      />
    </ThemeWrapper>
  );

  return (
    // <Provider store={store}>
    //   {typeof window !== "undefined" && persistor ? (
    //     <PersistGate loading={null} persistor={persistor}>
    //       {content}
    //     </PersistGate>
    //   ) : (
    //     content
    //   )}
    // </Provider>

    <Provider store={store}>{content}</Provider>
  );
}
