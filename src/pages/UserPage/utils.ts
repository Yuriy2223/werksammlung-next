import { isValid, parseISO } from "date-fns";

export const safeParseISO = (dateStr?: string | null) => {
  if (!dateStr) return null;
  const parsed = parseISO(dateStr);
  return isValid(parsed) ? parsed : null;
};

export const formatSec = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return m ? `${m} хв ${sec} с` : `${sec} с`;
};
