export type SortParams = {
  sortBy: string;
  sortOrder: "asc" | "desc";
};

const parseSortBy = (value: string | null): string => {
  const allowed = [
    "_id",
    "author",
    "technologies",
    "date",
    "title",
    "createdAt",
  ];
  return value && allowed.includes(value) ? value : "createdAt";
};

const parseSortOrder = (value: string | null): "asc" | "desc" => {
  return value === "asc" ? "asc" : "desc";
};

export const parseSortParams = (query: URLSearchParams): SortParams => {
  return {
    sortBy: parseSortBy(query.get("sortBy")),
    sortOrder: parseSortOrder(query.get("sortOrder")),
  };
};
