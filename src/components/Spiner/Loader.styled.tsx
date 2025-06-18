import styled, { keyframes } from "styled-components";

const sweep = keyframes`
  0% {
    mask-position: 180% 0%;
    -webkit-mask-position: 180% 0%;
  }
  100% {
    mask-position: -80% 0%;
    -webkit-mask-position: -80% 0%;
  }
`;

const dotFade = keyframes`
  0%, 20% {
    opacity: 0;
  }
  30%, 50% {
    opacity: 1;
  }
  60%, 100% {
    opacity: 0;
  }
`;

export const LoaderOverlay = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #0d0d0d;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LoadingText = styled.div`
  font-size: 22px;
  font-weight: 400;
  color: transparent;
  position: relative;
  display: flex;
  align-items: center;

  background: linear-gradient(120deg, #888 0%, #fff 45%, #888 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;

  mask-image: linear-gradient(
    120deg,
    rgba(0, 0, 0, 0) 10%,
    rgba(0, 0, 0, 1) 50%,
    rgba(0, 0, 0, 0) 90%
  );
  -webkit-mask-image: linear-gradient(
    120deg,
    rgba(0, 0, 0, 0) 10%,
    rgba(0, 0, 0, 1) 50%,
    rgba(0, 0, 0, 0) 90%
  );
  mask-size: 260% 100%;
  -webkit-mask-size: 260% 100%;

  animation: ${sweep} 6s linear infinite;
`;
export const Dots = styled.span`
  display: inline-flex;
  margin-left: 8px;
  gap: 8px;

  span {
    color: white;
    font-size: 26px;
    opacity: 0;
    animation: ${dotFade} 1.5s ease-in-out infinite;
  }

  span:nth-child(1) {
    animation-delay: 0s;
  }

  span:nth-child(2) {
    animation-delay: 0.3s;
  }

  span:nth-child(3) {
    animation-delay: 0.6s;
  }
`;
