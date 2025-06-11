import { parseISO, isSameDay, format } from "date-fns";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { formatSec } from "../../utils/userPageUtils";
import { Visit } from "@/types";

const Card = styled.div`
  background: linear-gradient(135deg, #f9fafb, #ffffff);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  color: #2d3748;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const CalendarWrapper = styled.div`
  flex: 1;
`;

const InfoWrapper = styled.div`
  flex: 1;
  margin-top: 1rem;

  @media (min-width: 768px) {
    margin-top: 0;
    margin-left: 2rem;
  }
`;

const InfoList = styled.ul`
  padding-left: 1.2rem;
  margin-top: 0.5rem;
  li {
    margin-bottom: 0.5rem;
    font-weight: 500;
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
`;

const Title = styled.h3`
  margin-bottom: 1rem;
  font-weight: 700;
  color: #4a5568;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Subtitle = styled.h4`
  margin-top: 1rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
  color: #2d3748;
`;

const ResetButton = styled.button`
  background: transparent;
  border: none;
  color: #6c5ce7;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  margin-top: 0.75rem;
  text-decoration: underline;
  padding: 0;
  &:hover {
    color: #4c3dbb;
  }
`;

type Props = {
  selectedDay: Date | null;
  onSelect: (d: Date | null) => void;
  visits: Visit[];
};

const CalendarCard = ({ selectedDay, onSelect, visits }: Props) => {
  const filtered = selectedDay
    ? visits.filter((v) => isSameDay(parseISO(v.date), selectedDay))
    : [];

  return (
    <Card>
      <Title>📅 Календар з відвідуваннями</Title>
      <ContentWrapper>
        <CalendarWrapper>
          <DatePicker
            selected={selectedDay}
            onChange={onSelect}
            placeholderText="Оберіть дату"
            inline
            maxDate={new Date()}
          />
        </CalendarWrapper>

        {selectedDay && (
          <InfoWrapper>
            <Subtitle>
              📆 Візити на {format(selectedDay, "dd.MM.yyyy")}
            </Subtitle>
            {filtered.length === 0 ? (
              <p>Немає даних</p>
            ) : (
              <InfoList>
                {filtered.map((v) => (
                  <li key={v._id}>
                    🕒 {formatSec(v.timeSpent)} | 🌍 {v.country}
                  </li>
                ))}
              </InfoList>
            )}
            <ResetButton onClick={() => onSelect(null)}>
              Очистити вибір
            </ResetButton>
          </InfoWrapper>
        )}
      </ContentWrapper>
    </Card>
  );
};

export default CalendarCard;
