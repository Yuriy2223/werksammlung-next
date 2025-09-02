import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import styled from "styled-components";

const COLORS = [
  "#00b894",
  "#0984e3",
  "#e17055",
  "#6c5ce7",
  "#fdcb6e",
  "#fab1a0",
];

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
  margin-bottom: 1.5rem;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: "🌍";
    font-size: 1.4rem;
  }
`;

type Props = {
  data: { name: string; value: number }[];
};

const CountryPieChart = ({ data }: Props) => (
  <Card>
    <Title>User countries</Title>
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={90}
          label={({ name, percent }) =>
            `${name} (${(percent * 100).toFixed(0)}%)`
          }
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </Card>
);

export default CountryPieChart;
