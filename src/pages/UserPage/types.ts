export type Visit = {
  _id: string;
  country: string;
  timeSpent: number;
  date: string;
};

export type Stats = {
  totalVisits: number;
  totalTime: number;
  countries: Record<string, number>;
  visits: Visit[];
};
