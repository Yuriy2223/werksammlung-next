import styled from "styled-components";
import Link from "next/link";

export const NotFoundContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

export const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
`;

export const Text = styled.div`
  z-index: 1;
  font-size: 34px;
  color: ${({ theme }) => theme.textPrimary};
  margin-bottom: 30px;
`;

export const ToNavLink = styled(Link)`
  padding: 12px 20px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.textPrimary};
  color: ${({ theme }) => theme.textPrimary};
  background-color: ${({ theme }) => theme.bgSecondary};
  z-index: 1;
  text-decoration: none;

  &:hover,
  &:active {
    box-shadow: 0 0 20px ${({ theme }) => theme.textPrimary};
    background-color: ${({ theme }) => theme.bgPrimary};
  }
`;
