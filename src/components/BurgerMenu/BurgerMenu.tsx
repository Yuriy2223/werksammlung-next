import { useEffect, FC, MouseEvent } from "react";
import { CloseButton, BurgerMenuContainer, Overlay } from "./BurgerMenu.styled";
import { Navigation } from "../Navigation/Navigation";
import { X } from "lucide-react";
import { UserActions } from "../UserActions/UserActions";

interface BurgerMenuProps {
  isOpen: boolean;
  closeMenu: () => void;
  activeSection: string;
  onNavClick: (e: MouseEvent<HTMLAnchorElement>, id: string) => void;
}

export const BurgerMenu: FC<BurgerMenuProps> = ({
  isOpen,
  closeMenu,
  activeSection,
  onNavClick,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeMenu]);

  return (
    <Overlay $isOpen={isOpen} onClick={closeMenu}>
      <BurgerMenuContainer
        $isOpen={isOpen}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClick={closeMenu} aria-label="Close menu">
          <X size={36} />
        </CloseButton>
        <Navigation activeSection={activeSection} onNavClick={onNavClick} />
        <UserActions closeMenu={closeMenu} />
      </BurgerMenuContainer>
    </Overlay>
  );
};
