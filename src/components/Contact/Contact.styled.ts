import styled from "styled-components";
import { Container } from "../../shared/Container";
import { Button } from "../../shared/Button";
import { motion } from "framer-motion";

export const ContactSection = styled.section`
  background-color: ${({ theme }) => theme.bgPrimary};
`;
export const ContactContainer = styled(Container)`
  padding: 40px 20px 60px;
  display: flex;
  flex-direction: column;
`;
export const ContactForm = styled(motion.form)`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    gap: 20px;
    padding: 20px;
  }
`;
export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    height: 220px;
    gap: 30px;
  }
`;
export const InputGroup = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const TextareaWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;

  @media (min-width: 768px) {
    flex: 1;
    height: 224px;
  }
`;
export const SocialWrapMob = styled.div`
  margin-top: 50px;

  @media (min-width: 768px) {
    display: none;
  }
`;
export const SocialWrapDTab = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;
export const SubmitButton = styled(Button)`
  width: 300px;
  height: 48px;
  flex-shrink: 0;
  margin: 40px auto 0;
  gap: 14px;

  svg {
    color: ${({ theme }) => theme.svg};
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;
export const SuccessMessage = styled(motion.div)`
  width: 300px;
  height: 60px;
  border-radius: 12px;
  font-weight: 500;
  font-size: 16px;
  color: #4caf50;
  background-color: ${({ theme }) => theme.bgSecondary};
  border: 1px solid ${({ theme }) => theme.svg};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
`;
