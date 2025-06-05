import styled from "styled-components";

export const LayoutWrapper = styled.div`
  background-color: ${({ theme }) => theme.bgPrimary};
  color: ${({ theme }) => theme.textPrimary};
  min-height: 100vh;
`;
export const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
  background-color: ${({ theme }) => theme.bgSecondary};
  box-shadow: 0 10px 20px -10px ${({ theme }) => theme.textPrimary};
`;
export const MainWrapper = styled.main`
  padding-top: 80px;
  background-color: ${({ theme }) => theme.bgPrimary};
`;
export const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.bgSecondary};
`;
