import { Calendar, XCircle } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const FiltersWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 2rem;
  background-color: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
`;

const DateGroup = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const DateLabel = styled.label`
  font-size: 0.875rem;
  color: #374151;
  font-weight: 600;
  margin-bottom: 0.4rem;
`;

const DatePickerWrapper = styled.div`
  position: relative;

  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #6b7280;
    width: 18px;
    height: 18px;
    pointer-events: none;
  }

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__input-container {
    input {
      width: 180px;
      padding: 0.5rem 1rem 0.5rem 2.25rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 0.95rem;
      background-color: #fff;
      transition: all 0.2s ease-in-out;

      &:focus {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
        outline: none;
      }
    }
  }
`;

const ResetButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.9rem;
  background-color: #fef2f2;
  color: #b91c1c;
  border: 1px solid #fca5a5;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background-color: #fee2e2;
  }
`;

type Props = {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
};

export const FiltersPanel = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: Props) => {
  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <FiltersWrapper>
      <DateGroup>
        <DateLabel htmlFor="start-date">Фільтр з:</DateLabel>
        <DatePickerWrapper>
          <Calendar />
          <DatePicker
            id="start-date"
            selected={startDate}
            onChange={setStartDate}
            placeholderText="Початкова дата"
            isClearable
            maxDate={endDate || undefined}
            dateFormat="yyyy-MM-dd"
          />
        </DatePickerWrapper>
      </DateGroup>

      <DateGroup>
        <DateLabel htmlFor="end-date">по:</DateLabel>
        <DatePickerWrapper>
          <Calendar />
          <DatePicker
            id="end-date"
            selected={endDate}
            onChange={setEndDate}
            placeholderText="Кінцева дата"
            isClearable
            minDate={startDate || undefined}
            dateFormat="yyyy-MM-dd"
          />
        </DatePickerWrapper>
      </DateGroup>

      <ResetButton onClick={handleReset}>
        <XCircle /> Скинути
      </ResetButton>
    </FiltersWrapper>
  );
};
