import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { useViewportAmount } from "../hooks/useViewportAmount";

const MotionTitle = styled(motion.h2)`
  text-align: center;
  font-weight: 700;
  line-height: 1.4;
  font-size: 36px;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.textPrimary};
  text-shadow: -3px 3px 20px ${({ theme }) => theme.textPrimary};
`;

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

export const Title: React.FC<TitleProps> = ({ children }) => {
  const viewportAmount = useViewportAmount();

  return (
    <MotionTitle
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0,
        duration: 0.7,
        ease: [0.25, 0.8, 0.25, 1],
      }}
      viewport={{ once: false, amount: viewportAmount }}
    >
      {children}
    </MotionTitle>
  );
};
