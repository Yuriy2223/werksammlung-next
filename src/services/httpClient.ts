// import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
// import { toast } from "react-toastify";
// import { store } from "../redux/store";
// import { logoutUser, refreshToken } from "../redux/auth/operations";

// const baseConfig = {
//   baseURL: "",
//   headers: { "Content-Type": "application/json" },
//   withCredentials: true,
// };

// export const publicInstance = axios.create(baseConfig);
// export const privateInstance = axios.create(baseConfig);

// let isRefreshing = false;
// let failedQueue: {
//   resolve: (value?: unknown) => void;
//   reject: (reason?: unknown) => void;
//   config: InternalAxiosRequestConfig;
// }[] = [];

// const processQueue = (error: AxiosError | null) => {
//   failedQueue.forEach(({ resolve, reject, config }) => {
//     if (error) {
//       reject(error);
//     } else {
//       resolve(privateInstance(config));
//     }
//   });
//   failedQueue = [];
// };

// privateInstance.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     const originalRequest = error.config as InternalAxiosRequestConfig & {
//       _retry?: boolean;
//     };

//     if (
//       error.response?.status !== 401 ||
//       originalRequest._retry ||
//       originalRequest.url?.includes("/api/users/refresh")
//     ) {
//       return Promise.reject(error);
//     }

//     originalRequest._retry = true;

//     if (isRefreshing) {
//       return new Promise((resolve, reject) => {
//         failedQueue.push({ resolve, reject, config: originalRequest });
//       });
//     }

//     isRefreshing = true;

//     try {
//       await store.dispatch(refreshToken()).unwrap();
//       toast.success("Сесію оновлено ✨");
//       processQueue(null);
//       return privateInstance(originalRequest);
//     } catch (refreshError) {
//       processQueue(refreshError as AxiosError);
//       await store.dispatch(logoutUser()).unwrap();
//       return Promise.reject(refreshError);
//     } finally {
//       isRefreshing = false;
//     }
//   }
// );

/*******************спроба оптимізувати******************************* */

// import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
// import { toast } from "react-toastify";
// import { store } from "../redux/store";
// import { logoutUser } from "../redux/auth/operations";

// const baseConfig = {
//   baseURL: "",
//   headers: { "Content-Type": "application/json" },
//   withCredentials: true,
// };

// export const publicInstance = axios.create(baseConfig);
// export const privateInstance = axios.create(baseConfig);

// let isRefreshing = false;
// let failedQueue: {
//   resolve: (value?: unknown) => void;
//   reject: (reason?: unknown) => void;
//   config: InternalAxiosRequestConfig;
// }[] = [];

// const processQueue = (error: AxiosError | null) => {
//   failedQueue.forEach(({ resolve, reject, config }) => {
//     if (error) {
//       reject(error);
//     } else {
//       resolve(privateInstance(config));
//     }
//   });
//   failedQueue = [];
// };

// privateInstance.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     const originalRequest = error.config as InternalAxiosRequestConfig & {
//       _retry?: boolean;
//       _skipRefresh?: boolean;
//     };

//     if (
//       error.response?.status !== 401 ||
//       originalRequest._retry ||
//       originalRequest._skipRefresh ||
//       originalRequest.url?.includes("/api/users/refresh") ||
//       originalRequest.url?.includes("/api/users/signin")
//     ) {
//       return Promise.reject(error);
//     }

//     originalRequest._retry = true;

//     if (isRefreshing) {
//       return new Promise((resolve, reject) => {
//         failedQueue.push({ resolve, reject, config: originalRequest });
//       });
//     }

//     isRefreshing = true;

//     try {
//       const response = await publicInstance.post("/api/users/refresh");

//       if (response.status === 200) {
//         processQueue(null);
//         return privateInstance(originalRequest);
//       } else {
//         throw new Error("Refresh failed");
//       }
//     } catch (refreshError) {
//       processQueue(refreshError as AxiosError);
//       toast.error("Session expired. Please log in again.");
//       store.dispatch(logoutUser());
//       return Promise.reject(refreshError);
//     } finally {
//       isRefreshing = false;
//     }
//   }
// );

// export const createReduxApiCall = async <T>(
//   config: InternalAxiosRequestConfig
// ): Promise<T> => {
//   const configWithSkip = {
//     ...config,
//     _skipRefresh: true,
//   };
//   return privateInstance(configWithSkip);
// };
/******************************** */

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
