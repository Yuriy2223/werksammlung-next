import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const baseConfig = {
  baseURL: "",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

export const publicInstance = axios.create(baseConfig);
export const privateInstance = axios.create(baseConfig);

export let isRefreshing = false;
export let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
  config: InternalAxiosRequestConfig;
}[] = [];

export const setIsRefreshing = (value: boolean) => {
  isRefreshing = value;
};

export const processQueue = (error: AxiosError | null) => {
  failedQueue.forEach(({ resolve, reject, config }) => {
    if (error) {
      reject(error);
    } else {
      resolve(privateInstance(config));
    }
  });
  failedQueue = [];
};

export const createReduxApiCall = async <T>(
  config: InternalAxiosRequestConfig
): Promise<T> => {
  const configWithSkip = {
    ...config,
    _skipRefresh: true,
  };
  return privateInstance(configWithSkip);
};
