import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const LogoContainer = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-weight: 500;
    font-size: 20px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.textPrimary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 180px;
    transition: all 300ms ease;

    &:hover {
      transform: scale(1.05) rotate(-4deg);
      text-shadow: 0 0 20px ${({ theme }) => theme.textPrimary},
        0 0 20px ${({ theme }) => theme.textPrimary};
    }
  }

  .cursor {
    display: inline-block;
    width: 1ch;
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    0%,
    100% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }
`;
