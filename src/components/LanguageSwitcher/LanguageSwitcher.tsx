import React, { useEffect } from "react";
import { Button } from "../../shared/Button";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { switchLanguage } from "../../redux/language/slice";
import { selectLanguage } from "../../redux/language/selectors";
import { useTranslation } from "react-i18next";
import { Language } from "../../App.type";
import styled from "styled-components";

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

  const handleSwitchLanguage = () => {
    dispatch(switchLanguage());
  };

  useEffect(() => {
    i18n.changeLanguage(currentLang);
    onLanguageChange?.(currentLang);
  }, [currentLang, i18n, onLanguageChange]);

  return (
    <BtnLang onClick={handleSwitchLanguage}>
      {t("buttons.lang")}: <span>{currentLang}</span>
    </BtnLang>
  );
};
