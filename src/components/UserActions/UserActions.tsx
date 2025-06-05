import { useTranslation } from "react-i18next";
import { LogIn, LogOut } from "lucide-react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import { openModal } from "../../redux/modal/slice";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";
import { LanguageSwitcher } from "../LanguageSwitcher/LanguageSwitcher";
import { BtnLogin, UserActionsWrapper } from "./UserActions.styled";
import { selectLoggedIn } from "../../redux/auth/selectors";

interface UserActionsProps {
  closeMenu?: () => void;
}

export const UserActions = ({ closeMenu }: UserActionsProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(selectLoggedIn);

  const handleAction = () => {
    if (isLoggedIn) {
      dispatch(openModal({ type: "ModalSignOut" }));
    } else {
      dispatch(openModal({ type: "ModalSignIn" }));
    }
    closeMenu?.();
  };

  return (
    <UserActionsWrapper>
      <ThemeSwitcher />
      <LanguageSwitcher />
      <BtnLogin type="button" onClick={handleAction}>
        {isLoggedIn ? t("buttons.logout") : t("buttons.login")}
        <span>{isLoggedIn ? <LogOut size={22} /> : <LogIn size={22} />}</span>
      </BtnLogin>
    </UserActionsWrapper>
  );
};
