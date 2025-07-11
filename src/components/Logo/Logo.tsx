import { useEffect, useState } from "react";
import { LogoContainer } from "./Logo.styled";
import { selectProfile } from "../../redux/profile/selectors";
import { useSelector } from "react-redux";
// import { useTranslation } from "react-i18next";
import Link from "next/link";
import { selectLanguage } from "@/redux/language/selectors";

export const Logo = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  // const { i18n } = useTranslation();
  const profile = useSelector(selectProfile);
  // const lang = i18n.language.toLowerCase() as "en" | "ua" | "de";
  // const lang = i18n.language;
  // const fullName = `${profile?.firstName?.[lang] || ""} ${
  //   profile?.lastName?.[lang] || ""
  // }`;
  const currentLanguage = useSelector(selectLanguage);
  const firstName = profile?.firstName?.[currentLanguage] || "";
  const lastName = profile?.lastName?.[currentLanguage] || "";

  const fullName = `${firstName} ${lastName}`;
  useEffect(() => {
    let typingTimeout: ReturnType<typeof setTimeout>;

    if (index <= fullName.length) {
      typingTimeout = setTimeout(() => {
        setDisplayedText(fullName.slice(0, index));
        setIndex((prev) => prev + 1);
      }, 150);
    } else {
      typingTimeout = setTimeout(() => {
        setDisplayedText("");
        setIndex(0);
      }, 4000);
    }

    return () => clearTimeout(typingTimeout);
  }, [index, fullName]);

  useEffect(() => {
    setDisplayedText("");
    setIndex(0);
  }, [fullName]);

  return (
    <Link href="/" passHref>
      <LogoContainer
        // to="/"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <p>
          {displayedText}
          <span className="cursor">|</span>
        </p>
      </LogoContainer>
    </Link>
  );
};
