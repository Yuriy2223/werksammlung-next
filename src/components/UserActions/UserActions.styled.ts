import { Button } from "@/shared/Button";
import styled from "styled-components";

export const UserActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;

  @media (min-width: 1280px) {
    flex-direction: row;
    gap: 14px;
  }
`;
export const BtnLogin = styled(Button)`
  text-transform: uppercase;

  span {
    color: ${({ theme }) => theme.svg};
    transform: translateY(2px);
  }
`;
