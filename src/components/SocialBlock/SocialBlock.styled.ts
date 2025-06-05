import { motion } from "framer-motion";
import styled from "styled-components";

export const SocialLinks = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 1280px) {
    justify-content: center;
    gap: 30px;
  }
`;
export const SocialLinksContact = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;
export const SocialLink = styled(motion.a)`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.textPrimary};
  border: 2px solid ${({ theme }) => theme.textPrimary};
  background-color: ${({ theme }) => theme.bgSecondary};

  svg {
    transition: all 0.3s ease;
    color: ${({ theme }) => theme.svg};
  }

  &:hover,
  &:active {
    box-shadow: 0 0 20px ${({ theme }) => theme.textPrimary};
    background-color: ${({ theme }) => theme.bgSecondary};
  }
`;
