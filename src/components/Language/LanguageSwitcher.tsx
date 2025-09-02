import React, { useEffect, useState } from "react";
import { Button } from "../../shared/Button";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { switchLanguage } from "../../redux/language/slice";
import { selectLanguage } from "../../redux/language/selectors";
import { useTranslation } from "react-i18next";
import { Language } from "@/types";
import styled from "styled-components";
import PageTransitionOverlay from "./PageTransitionOverlay";

export const BtnLang = styled(Button)`
  span {
    font-size: 18px;
    color: ${({ theme }) => theme.svg};
  }
`;

interface Props {
  onLanguageChange?: (lang: Language) => void;
}

export const LanguageSwitcher: React.FC<Props> = ({ onLanguageChange }) => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const currentLang = useSelector(selectLanguage);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSwitchLanguage = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      dispatch(switchLanguage());
    }, 100);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  useEffect(() => {
    i18n.changeLanguage(currentLang);
    onLanguageChange?.(currentLang);
  }, [currentLang, i18n, onLanguageChange]);

  return (
    <>
      <PageTransitionOverlay active={isTransitioning} />
      <BtnLang onClick={handleSwitchLanguage}>
        {t("buttons.lang")}: <span>{currentLang.toUpperCase()}</span>
      </BtnLang>
    </>
  );
};
