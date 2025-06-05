import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n/i18n";
import { selectProfile } from "../../redux/profile/selectors";
import { FooterContainer } from "./Footer.steled";

export const Footer = () => {
  const { t } = useTranslation();
  const profile = useSelector(selectProfile);
  const lang = i18n.language.toLowerCase() as "en" | "ua" | "de";
  const fullName = `${profile?.firstName?.[lang] || ""} ${
    profile?.lastName?.[lang] || ""
  }`;
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <p>{`© ${currentYear} ${fullName}. ${t("footer.copyright")}`}</p>
    </FooterContainer>
  );
};
