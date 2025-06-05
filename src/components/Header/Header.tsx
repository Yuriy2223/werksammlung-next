import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Logo } from "../Logo/Logo";
import { Navigation } from "../Navigation/Navigation";
import { UserActions } from "../UserActions/UserActions";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";
import {
  BurgerBtn,
  DesktopActions,
  DesktopNavigayion,
  HeaderContainer,
} from "./Header.styled";

export const Header = () => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [menuBurger, setMenuBurger] = useState(false);
  const toggleMenu = () => setMenuBurger((prev) => !prev);
  const closeMenu = () => setMenuBurger(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const headerOffset = 80;
      const scrollPos = window.scrollY + headerOffset + 1;

      let current = "";

      sections.forEach((section) => {
        const offsetTop = section.offsetTop;
        const offsetHeight = section.offsetHeight;

        if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
          current = section.id;
        }
      });

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      if (atBottom) {
        current = "contact";
      }

      if (current !== activeSection) {
        setActiveSection(current);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const target = document.getElementById(id);
    const headerHeight = 80;
    if (target) {
      const offsetTop = target.offsetTop - headerHeight;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <HeaderContainer>
      <Logo />
      <DesktopNavigayion>
        <Navigation activeSection={activeSection} onNavClick={handleNavClick} />
      </DesktopNavigayion>
      <DesktopActions>
        <UserActions />
      </DesktopActions>
      <BurgerBtn onClick={toggleMenu} aria-label="Open menu">
        <Menu size={30} />
      </BurgerBtn>
      <BurgerMenu
        isOpen={menuBurger}
        activeSection={activeSection}
        onNavClick={(e, id) => {
          handleNavClick(e, id);
          setMenuBurger(false);
        }}
        closeMenu={closeMenu}
      />
    </HeaderContainer>
  );
};
