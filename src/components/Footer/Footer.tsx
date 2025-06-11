import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { selectProfile } from "../../redux/profile/selectors";
import { FooterContainer } from "./Footer.steled";
import { selectLanguage } from "@/redux/language/selectors";

export const Footer = () => {
  const { t } = useTranslation();
  const profile = useSelector(selectProfile);
  const currentLanguage = useSelector(selectLanguage);
  const firstName = profile?.firstName?.[currentLanguage] || "";
  const lastName = profile?.lastName?.[currentLanguage] || "";
  const fullName = `${firstName} ${lastName}`;
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <p>{`© ${currentYear} ${fullName}. ${t("footer.copyright")}`}</p>
    </FooterContainer>
  );
};
