import { AxiosError } from "axios";

export function extractErrorMessage(
  error: unknown,
  fallback = "Something went wrong"
): string {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || fallback;
  }
  return fallback;
}
