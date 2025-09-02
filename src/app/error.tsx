"use client";

import { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { RotateCcw } from "lucide-react";
import { Button } from "@/shared/Button";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background-color: ${({ theme }) => theme.bgPrimary};
  color: ${({ theme }) => theme.textPrimary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-out;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 16px;

  @media (min-width: 640px) {
    font-size: 3rem;
  }
`;

const Message = styled.p`
  max-width: 500px;
  margin-bottom: 30px;
`;

const RetryButton = styled(Button)`
  width: 300px;
  gap: 12px;
  font-weight: 600;
`;

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // console.error("🌍 Global Error:", error);
  }, [error]);

  return (
    <Wrapper>
      <Title>🛑 Oops! Something went wrong.</Title>
      <Message>{error.message || "Unknown error. Try again!"}</Message>
      <RetryButton onClick={reset}>
        <RotateCcw size={20} />
        Try again
      </RetryButton>
    </Wrapper>
  );
}
