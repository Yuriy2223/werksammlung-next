"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/redux/store";
import { ThemeWrapper } from "@/components/Theme/ThemeWrapper";
import { GlobalStyles } from "@/styles/GlobalStyles";
import { ToastContainer } from "react-toastify";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeWrapper>
          <GlobalStyles />
          {children}
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar
            closeOnClick
            pauseOnHover
            draggable
          />
        </ThemeWrapper>
      </PersistGate>
    </Provider>
  );
}
