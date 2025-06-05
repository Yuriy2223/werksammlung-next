import styled from "styled-components";
import { Container } from "../../shared/Container";

export const FooterContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.textPrimary};
  height: 90px;
`;
