import styled from "styled-components";

export const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  height: 260px;

  @media (min-width: 1280px) {
    flex-direction: row;
    width: 420px;
    height: auto;
  }

  a {
    position: relative;
    padding: 4px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-decoration: none;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.textPrimary},
      ${({ theme }) => theme.textPrimary}
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    &:hover {
      transform: scale(1.05);
      background: ${({ theme }) => theme.linear};
      background-size: 200%;
      animation: textFlow 2s linear infinite;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    &::after {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 2px;
      background-color: transparent;
      border-radius: 1px;
      transition: width 0.4s ease, background-color 0.4s ease;
    }

    &.active {
      background: ${({ theme }) => theme.linear};
      background-size: 300%;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: textFlow 3s ease-in-out infinite;

      &::after {
        width: 50%;
        background: ${({ theme }) => theme.linear};
        animation: underlineGlow 1.2s ease-in-out forwards;
      }
    }
  }

  @keyframes textFlow {
    0% {
      background-position: 0%;
    }
    100% {
      background-position: 100%;
    }
  }

  @keyframes underlineGlow {
    0% {
      opacity: 0;
      width: 0;
    }
    50% {
      opacity: 1;
      width: 120%;
    }
    100% {
      width: 100%;
    }
  }

  @media (min-width: 1280px) {
  }
`;
