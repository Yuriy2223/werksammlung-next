export type FilterParams = {
  minYear?: Date;
  maxYear?: Date;
};

const parseYear = (value: string | null): number | undefined => {
  if (!value) return undefined;

  const parsed = parseInt(value, 10);
  return Number.isNaN(parsed) ? undefined : parsed;
};

export const parseFilterParams = (query: URLSearchParams): FilterParams => {
  const minYear = parseYear(query.get("minYear"));
  const maxYear = parseYear(query.get("maxYear"));

  return {
    minYear: minYear ? new Date(`${minYear}-01-01T00:00:00.000Z`) : undefined,
    maxYear: maxYear ? new Date(`${maxYear}-12-31T23:59:59.999Z`) : undefined,
  };
};
