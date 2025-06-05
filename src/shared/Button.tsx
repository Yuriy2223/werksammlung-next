import React from "react";
import styled from "styled-components";

const BtnWrapper = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 8px;
  background-color: ${({ theme }) => theme.bgSecondary};
  color: ${({ theme }) => theme.textPrimary};
  border: 1px solid ${({ theme }) => theme.textPrimary};

  &:hover,
  &:active {
    background-color: ${({ theme }) => theme.bgPrimary};
    color: ${({ theme }) => theme.textPrimary};
    box-shadow: 0 0 26px ${({ theme }) => theme.textPrimary};
  }
`;

interface ButtonProps {
  type?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <BtnWrapper className={className} onClick={onClick}>
      {children}
    </BtnWrapper>
  );
};
