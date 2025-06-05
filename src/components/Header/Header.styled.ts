import styled from "styled-components";
import { Container } from "../../shared/Container";

export const HeaderContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

  /* @media (min-width: 1280px) {
    padding: 20px;
  } */
`;
export const DesktopNavigayion = styled.div`
  display: none;

  @media (min-width: 1280px) {
    display: block;
  }
`;
export const DesktopActions = styled.div`
  display: none;

  @media (min-width: 1280px) {
    display: block;
  }
`;
export const BurgerBtn = styled.button`
  display: block;
  background: none;
  outline: none;
  border: none;
  padding: 4px;
  color: ${({ theme }) => theme.textPrimary};

  svg {
    transition: all 300ms ease;
  }

  &:hover,
  &:active {
    svg {
      color: ${({ theme }) => theme.svg};
      transform: rotate(360deg) scale(1.2);
    }
  }

  @media (min-width: 1280px) {
    display: none;
  }
`;
