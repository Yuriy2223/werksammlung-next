import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";

const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
`;

type Props = {
  data: { date: string; count: number }[];
};

const VisitsLineChart = ({ data }: Props) => (
  <Card>
    <h3>📈 Відвідування по днях</h3>
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#0984e3" />
      </LineChart>
    </ResponsiveContainer>
  </Card>
);

export default VisitsLineChart;
