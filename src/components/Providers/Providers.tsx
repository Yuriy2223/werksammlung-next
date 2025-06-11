"use client";

import "@/lib/i18n/i18n";
import "react-toastify/dist/ReactToastify.css";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ThemeWrapper } from "@/components/Theme/ThemeWrapper";
import { GlobalStyles } from "@/styles/GlobalStyles";
import { ToastContainer } from "react-toastify";
import { AppGuard } from "@/components/AppGuard/AppGuard";
import { ThemeInitializer } from "../Theme/ThemeInitializer";

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

  return <Provider store={store}>{content}</Provider>;
}
