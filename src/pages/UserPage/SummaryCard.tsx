import styled from "styled-components";
import { formatSec } from "./utils";

const SummaryWrapper = styled.div`
  background: linear-gradient(145deg, #e6ecf3, #ffffff);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  margin-top: 2rem;
  text-align: center;
  font-weight: 500;
  font-size: 1rem;
  color: #2d3748;
  display: grid;
  gap: 1rem;
`;

const Stat = styled.p`
  margin: 0;
  font-size: 1.1rem;

  strong {
    color: #3182ce;
    font-weight: 700;
  }
`;

type Props = {
  count: number;
  min: number;
  avg: number;
  max: number;
};

export const SummaryCard = ({ count, min, avg, max }: Props) => (
  <SummaryWrapper>
    <Stat>
      Всього візитів: <strong>{count}</strong>
    </Stat>
    <Stat>
      Мінімальна тривалість: <strong>{formatSec(min)}</strong>
    </Stat>
    <Stat>
      Середня тривалість: <strong>{formatSec(avg)}</strong>
    </Stat>
    <Stat>
      Максимальна тривалість: <strong>{formatSec(max)}</strong>
    </Stat>
  </SummaryWrapper>
);
