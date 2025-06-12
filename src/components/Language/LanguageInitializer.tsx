"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectLanguage } from "@/redux/language/selectors";
import { initI18n } from "@/lib/i18n/i18n";

export const LanguageInitializer = () => {
  const currentLanguage = useSelector(selectLanguage);

  useEffect(() => {
    initI18n(currentLanguage);
  }, [currentLanguage]);

  return null;
};
