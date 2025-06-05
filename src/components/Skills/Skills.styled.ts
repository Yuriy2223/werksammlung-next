import { motion } from "framer-motion";
import styled from "styled-components";
import { Container } from "../../shared/Container";
import { Link } from "react-router-dom";

export const SkillsSections = styled.section`
  background-color: ${({ theme }) => theme.bgPrimary};
`;
export const SkillsContainer = styled(Container)`
  padding: 40px 20px;
`;
export const Categories = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;

  @media (max-width: 374px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
`;
export const SkillsCard = styled(motion.div)`
  border-radius: 12px;
  padding: 20px 40px;
  background-color: ${({ theme }) => theme.bgSecondary};
  border: 1px solid ${({ theme }) => theme.textPrimary};
  box-shadow: 0 0 8px ${({ theme }) => theme.textPrimary};
  color: ${({ theme }) => theme.textPrimary};
  transition: all 300ms ease;
`;
export const CategoryTitle = styled.h3`
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
  border-bottom: 2px solid ${({ theme }) => theme.svg};
  padding-bottom: 8px;
`;
export const SkillList = styled(motion.ul)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const SkillLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 16px;
  color: ${({ theme }) => theme.textPrimary};
  position: relative;
  transition: all 300ms ease;

  svg {
    color: ${({ theme }) => theme.svg};
    font-size: 16px;
    transition: all 300ms ease;
  }

  &::before {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.textPrimary};
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 300ms ease, background-color 300ms ease;
  }

  &:hover,
  &:active {
    color: ${({ theme }) => theme.hover};

    &::before {
      transform: scaleX(1);
      background-color: ${({ theme }) => theme.hover};
    }

    svg {
      color: ${({ theme }) => theme.hover};
    }
  }
`;
