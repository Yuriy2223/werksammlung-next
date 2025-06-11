// import styled, { keyframes } from "styled-components";
// import { Loader2 } from "lucide-react";

// const fadeIn = keyframes`
//   from { opacity: 0 }
//   to { opacity: 1 }
// `;

// const fadeOut = keyframes`
//   from { opacity: 1 }
//   to { opacity: 0 }
// `;

// const Overlay = styled.div<{ active: boolean }>`
//   position: fixed;
//   inset: 0;
//   z-index: 9999;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: rgba(255, 255, 255, 0.7);
//   backdrop-filter: blur(2px);
//   pointer-events: ${({ active }) => (active ? "auto" : "none")};
//   animation: ${({ active }) => (active ? fadeIn : fadeOut)} 0.3s ease;
//   opacity: ${({ active }) => (active ? 1 : 0)};
//   transition: opacity 0.3s ease;
// `;

// const SpinnerIcon = styled(Loader2)`
//   width: 40px;
//   height: 40px;
//   color: ${({ theme }) => theme.primary || "#2563eb"};
//   animation: spin 1s linear infinite;

//   @keyframes spin {
//     to {
//       transform: rotate(360deg);
//     }
//   }
// `;

// export default function PageTransitionOverlay({ active }: { active: boolean }) {
//   return (
//     <Overlay active={active}>
//       <SpinnerIcon />
//     </Overlay>
//   );
// }

/* import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`;

const fadeOut = keyframes`
  from { opacity: 1 }
  to { opacity: 0 }
`;

const BlurOverlay = styled.div<{ active: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background-color: rgba(255, 255, 255, 0.4); 
  backdrop-filter: blur(8px);
  pointer-events: ${({ active }) => (active ? "auto" : "none")};
  animation: ${({ active }) => (active ? fadeIn : fadeOut)} 0.3s ease;
  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

export default function PageTransitionOverlay({ active }: { active: boolean }) {
  return <BlurOverlay active={active} />;
} */

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
