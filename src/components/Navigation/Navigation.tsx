import React from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavList } from "./Navigation.styled";

interface NavigationProps {
  activeSection: string;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onNavClick,
}) => {
  const { t } = useTranslation();
  const location = useLocation();
  if (location.pathname.startsWith("/user")) {
    return null;
  }
  const navItems = [
    { id: "about", label: t("header.about") },
    { id: "skills", label: t("header.skills") },
    { id: "projects", label: t("header.projects") },
    { id: "contact", label: t("header.contact") },
  ];

  return (
    <NavList role="navigation" aria-label="Main navigation">
      {navItems.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          onClick={(e) => onNavClick(e, id)}
          className={activeSection === id ? "active" : ""}
        >
          {label}
        </a>
      ))}
    </NavList>
  );
};
