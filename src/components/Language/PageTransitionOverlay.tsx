import React from "react";
import styled from "styled-components";

interface Props {
  active: boolean;
}

const Overlay = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.4);
  opacity: ${({ active }) => (active ? 1 : 0)};
  pointer-events: none;
  transition: opacity 0.4s ease-in-out;
  z-index: 9999;
`;

const PageTransitionOverlay: React.FC<Props> = ({ active }) => {
  return <Overlay active={active} />;
};

export default PageTransitionOverlay;
