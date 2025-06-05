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
  data: { month: string; count: number }[];
};

const VisitsLineChartByMonth = ({ data }: Props) => (
  <Card>
    <h3>📊 Відвідування по місяцях</h3>
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          tickFormatter={(month) => {
            const [year, m] = month.split("-");
            return `${m}.${year}`;
          }}
        />
        <YAxis />
        <Tooltip
          labelFormatter={(label) => `Місяць: ${label}`}
          formatter={(value: number) => [`${value}`, "Відвідувань"]}
        />
        <Line type="monotone" dataKey="count" stroke="#6c5ce7" />
      </LineChart>
    </ResponsiveContainer>
  </Card>
);

export default VisitsLineChartByMonth;
