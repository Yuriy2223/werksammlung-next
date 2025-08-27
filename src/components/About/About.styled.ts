import { motion } from "framer-motion";
import styled from "styled-components";
import { Container } from "../../shared/Container";
import { Button } from "../../shared/Button";

export const AboutSection = styled.section`
  background-color: ${({ theme }) => theme.bgSecondary};
`;
export const AboutContainer = styled(Container)`
  display: flex;
  flex-direction: column;

  @media (max-width: 1279px) {
    padding-top: 50px;
    padding-bottom: 40px;
  }
`;
export const AboutWrapTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;

  @media (min-width: 1280px) {
    flex-direction: row-reverse;
  }
`;
export const AboutWrapBottom = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-left: 16px;
  }

  @media (min-width: 768px) {
    padding: 0 40px;
    gap: 40px;
    font-size: 20px;

    span {
      margin-left: 30px;
    }
  }

  @media (min-width: 1280px) {
    padding: 40px 40px 0;
    font-size: 20px;

    span {
      margin-left: 30px;
    }
  }
`;
export const WrapperImg = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 290px;
  height: 290px;
  border-radius: 12px;
  overflow: hidden;
  border-radius: 50%;

  @media (min-width: 768px) {
    width: 440px;
    height: 440px;
  }

  @media (min-width: 1280px) {
    width: 500px;
    height: 500px;
  }
`;
export const WrapperContext = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const ContextInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 26px;
    line-height: 1.4;
    font-weight: 600;
    text-shadow: -3px 3px 30px ${({ theme }) => theme.textPrimary};
  }

  h1 {
    font-size: 34px;
    line-height: 1.4;
    font-weight: 700;
    text-shadow: -3px 3px 30px ${({ theme }) => theme.textPrimary};
  }

  @media (min-width: 768px) {
    p {
      font-size: 36px;
    }

    h1 {
      font-size: 50px;
    }
  }

  @media (min-width: 1280px) {
    align-items: start;

    p {
      font-size: 40px;
      line-height: 1.6;
    }

    h1 {
      font-size: 54px;
      line-height: 1.6;
    }
  }
`;
export const ToContact = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 40px 0;
  gap: 40px;

  @media (min-width: 1280px) {
    flex-direction: row;
  }
`;
export const AboutBtnWrapper = styled(motion.div)`
  display: inline-block;
`;
export const AboutBtn = styled(Button)`
  width: 140px;
  height: 46px;
  box-shadow: 0 0 10px ${({ theme }) => theme.textPrimary};

  svg {
    color: ${({ theme }) => theme.svg};
  }
`;
