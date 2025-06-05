import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { useViewportAmount } from "../hooks/useViewportAmount";

const MotionSubTitle = styled(motion.p)`
  text-align: center;
  color: ${({ theme }) => theme.textPrimary};
  font-weight: 500;
  line-height: 1.4;
  font-size: 24px;
  text-shadow: -2px 2px 10px ${({ theme }) => theme.textPrimary};
  margin-bottom: 40px;
`;

interface SubTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const SubTitle: React.FC<SubTitleProps> = ({ children }) => {
  const viewportAmount = useViewportAmount();

  return (
    <MotionSubTitle
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.1,
        duration: 0.8,
        ease: [0.25, 0.8, 0.25, 1],
      }}
      viewport={{ once: false, amount: viewportAmount }}
    >
      {children}
    </MotionSubTitle>
  );
};
