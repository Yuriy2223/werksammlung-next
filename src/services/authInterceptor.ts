import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import {
  privateInstance,
  publicInstance,
  isRefreshing,
  failedQueue,
  setIsRefreshing,
  processQueue,
} from "./httpClient";

let onUnauthorized: (() => void) | null = null;

export const setUnauthorizedHandler = (handler: () => void) => {
  onUnauthorized = handler;
};

privateInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
      _skipRefresh?: boolean;
    };

    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      originalRequest._skipRefresh ||
      originalRequest.url?.includes("/api/users/refresh") ||
      originalRequest.url?.includes("/api/users/signin")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject, config: originalRequest });
      });
    }

    setIsRefreshing(true);

    try {
      const response = await publicInstance.post("/api/users/refresh");

      if (response.status === 200) {
        processQueue(null);
        return privateInstance(originalRequest);
      } else {
        throw new Error("Refresh failed");
      }
    } catch (refreshError) {
      processQueue(refreshError as AxiosError);

      if (onUnauthorized) {
        onUnauthorized();
      }

      return Promise.reject(refreshError);
    } finally {
      setIsRefreshing(false);
    }
  }
);
