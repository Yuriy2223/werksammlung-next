"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
}: // reset,
{
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("🌍 Global Error:", error);
  }, [error]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-red-50 px-6 text-center">
      <h1 className="text-5xl font-extrabold text-red-700 mb-4 drop-shadow-md select-none">
        🛑 Упс! Помилка
      </h1>
      <p className="max-w-md text-red-800 text-lg mb-8 select-text">
        {error.message || "Щось пішло не так. Будь ласка, спробуйте знову."}
      </p>
      {/* <button
        onClick={() => reset()}
        className="inline-block rounded-lg bg-red-600 px-8 py-3 text-white text-lg font-semibold shadow-lg
                   hover:bg-red-700 hover:scale-105 active:scale-95 transition-transform duration-200 ease-in-out
                   focus:outline-none focus:ring-4 focus:ring-red-300"
        aria-label="Повторити спробу"
        autoFocus
      >
        Спробувати ще раз
      </button> */}
    </div>
  );
}
