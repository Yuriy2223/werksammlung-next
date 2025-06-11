const parseNumber = (value: string | null, defaultValue: number): number => {
  if (value === null) return defaultValue;

  const parsed = parseInt(value, 10);
  return Number.isNaN(parsed) ? defaultValue : parsed;
};

export type PaginationParams = {
  page: number;
  perPage: number;
  skip: number;
  limit: number;
};

export const parsePaginationParams = (
  query: URLSearchParams
): PaginationParams => {
  const page = parseNumber(query.get("page"), 1);
  const perPage = parseNumber(query.get("perPage"), 6);

  return {
    page,
    perPage,
    skip: (page - 1) * perPage,
    limit: perPage,
  };
};
