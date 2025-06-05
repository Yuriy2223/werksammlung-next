"use client"; // цей файл виконується на клієнті — бо є state, ефекти, redux

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/redux/store";
import { ThemeWrapper } from "@/components/Theme/ThemeWrapper";
import { GlobalStyles } from "@/styles/GlobalStyles";
import { ToastContainer } from "react-toastify";

export function Providers({ children }: { children: ReactNode }) {
  // тут обгортаємо все додатком — аналог обгортки в main.tsx
  return (
    <Provider store={store}>
      {" "}
      {/* Redux store */}
      <PersistGate loading={null} persistor={persistor}>
        {" "}
        {/* Redux-persist */}
        <ThemeWrapper>
          {" "}
          {/* твоя тема */}
          <GlobalStyles /> {/* глобальні стилі */}
          {children} {/* сюди потрапляє все з app/layout.tsx */}
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
