import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { SocialContact } from "../SocialBlock/SocialBlock";
import { selectProfile } from "../../redux/profile/selectors";
import { useViewportAmount } from "../../hooks/useViewportAmount";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import { API_URL } from "../../services/Api";
import { Languages } from "../../App.type";
import {
  AboutBtn,
  AboutContainer,
  AboutSection,
  ContextInner,
  AboutWrapBottom,
  WrapperContext,
  WrapperImg,
  AboutWrapTop,
  ToContact,
  AboutBtnWrapper,
} from "./About.styled";

export const About = () => {
  const { t, i18n } = useTranslation();
  const profile = useSelector(selectProfile);
  const viewportAmount = useViewportAmount();
  const isDesktop = useIsDesktop();
  const lang = i18n.language.toLowerCase() as Languages;
  const fullName = `${profile?.firstName?.[lang] || ""} ${
    profile?.lastName?.[lang] || ""
  }`;

  const handleOpenCV = () => {
    if (!profile?._id) return;
    window.open(`${API_URL}${profile.viewCV}`, "_blank");
  };

  return (
    <AboutSection id="about">
      <AboutContainer>
        <AboutWrapTop>
          <motion.div
            initial={isDesktop ? { opacity: 0, x: -200 } : { opacity: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false, amount: viewportAmount }}
            style={{ flex: 1 }}
          >
            <WrapperImg>
              <img src={profile?.avatarUrl} alt={`${fullName} portrait`} />
            </WrapperImg>
          </motion.div>

          <motion.div
            initial={isDesktop ? { opacity: 0, x: 200 } : { opacity: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false, amount: viewportAmount }}
            style={{ flex: 1 }}
          >
            <WrapperContext>
              <ContextInner>
                <p>{t("about.hi")}</p>
                <h1>{fullName}</h1>
                <p>{t("about.full")}</p>
                <p>{t("about.dev")}</p>
                <ToContact>
                  <motion.div
                    initial={
                      isDesktop ? { opacity: 0, x: 300 } : { opacity: 0 }
                    }
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 2,
                      ease: "easeOut",
                    }}
                    viewport={{ once: false, amount: viewportAmount }}
                  >
                    <AboutBtnWrapper>
                      <AboutBtn onClick={handleOpenCV}>
                        <FileText size={20} /> {t("buttons.wiewcv")}
                      </AboutBtn>
                    </AboutBtnWrapper>
                  </motion.div>

                  <SocialContact />
                </ToContact>
              </ContextInner>
            </WrapperContext>
          </motion.div>
        </AboutWrapTop>

        <AboutWrapBottom>
          <motion.div
            initial={isDesktop ? { opacity: 0, y: 200 } : { opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false, amount: viewportAmount }}
          >
            <p>{profile?.about[lang]}</p>
          </motion.div>
        </AboutWrapBottom>
      </AboutContainer>
    </AboutSection>
  );
};
