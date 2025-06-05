import styled from "styled-components";

export const Overlay = styled.div<{ $isOpen: boolean }>`
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
  transition: opacity 0.3s ease;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: transparent;
  z-index: 4;

  @media (min-width: 1280px) {
    display: none;
  }
`;
export const BurgerMenuContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 60%;
  max-width: 400px;
  height: 100vh;
  background-color: ${({ theme }) => theme.bgPrimary};
  box-shadow: 0 0 20px ${({ theme }) => theme.textPrimary};
  transform: ${({ $isOpen }) =>
    $isOpen ? "translateX(0)" : "translateX(100%)"};
  transition: transform 0.8s ease;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 100px 40px 60px;

  @media (min-width: 1280px) {
    display: none;
  }
`;
export const CloseButton = styled.button`
  padding: 6px;
  position: absolute;
  top: 28px;
  right: 20px;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.textPrimary};

  &:hover,
  &:active {
    transform: rotate(3600deg) scale(1.2);
    opacity: 0.8;
  }
`;
