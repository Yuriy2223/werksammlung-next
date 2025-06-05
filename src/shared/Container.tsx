import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;

  @media (max-width: 374px) {
    max-width: 374px;
    padding: 10px;
  }

  @media (min-width: 375px) and (max-width: 767px) {
    max-width: 375px;
    padding: 16px;
  }

  @media (min-width: 768px) and (max-width: 1279px) {
    max-width: 768px;
    padding: 20px;
  }

  @media (min-width: 1280px) {
    padding: 40px 20px;
  }
`;

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
}) => {
  return <StyledContainer className={className}>{children}</StyledContainer>;
};
