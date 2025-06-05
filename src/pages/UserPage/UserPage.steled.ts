import styled from "styled-components";
import { Container } from "../../shared/Container";

export const UserPageContainer = styled(Container)`
  /* display: flex;
  flex-direction: column; */
`;
export const UserPageTitle = styled.h1`
  text-align: center;
  font-size: 2.2rem;
`;

export const ChartGrid = styled.div`
  display: grid;
  gap: 2rem;
  /* grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); */
  grid-template-columns: repeat(auto-fit, minmax(1fr));
  margin-top: 2rem;
`;
