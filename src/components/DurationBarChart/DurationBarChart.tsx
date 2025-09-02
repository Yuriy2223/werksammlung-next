import { useState } from "react";
import { formatSec } from "../../utils/userPageUtils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";

const Card = styled.div`
  background: linear-gradient(135deg, #f9fafb, #ffffff);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  color: #2d3748;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: "⏱️";
    font-size: 1.4rem;
  }
`;

const FilterBar = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const FilterButton = styled.button<{ $active: boolean }>`
  padding: 0.4rem 0.9rem;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  background: ${({ $active }) => ($active ? "#6c5ce7" : "#e0e0e0")};
  color: ${({ $active }) => ($active ? "#fff" : "#2d3748")};
  transition: background 0.2s;

  &:hover {
    background: ${({ $active }) => ($active ? "#5e50d8" : "#d5d5d5")};
  }
`;

type Period = "day" | "week" | "month";

type Props = {
  data: {
    day: { name: string; duration: number }[];
    week: { name: string; duration: number }[];
    month: { name: string; duration: number }[];
  };
};

const DurationBarChart = ({ data }: Props) => {
  const [period, setPeriod] = useState<Period>("week");

  return (
    <Card>
      <Title>Duration of visits</Title>

      <FilterBar>
        {(["day", "week", "month"] as Period[]).map((p) => (
          <FilterButton
            key={p}
            $active={period === p}
            onClick={() => setPeriod(p)}
          >
            {p === "day" && "День"}
            {p === "week" && "Тиждень"}
            {p === "month" && "Місяць"}
          </FilterButton>
        ))}
      </FilterBar>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data[period]}>
          <CartesianGrid stroke="#e0e0e0" strokeDasharray="4 4" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            formatter={(value: number) => formatSec(value)}
            labelFormatter={(label: string) => `Дата: ${label}`}
          />
          <Bar
            dataKey="duration"
            fill="#6c5ce7"
            radius={[6, 6, 0, 0]}
            barSize={30}
            animationDuration={800}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default DurationBarChart;
