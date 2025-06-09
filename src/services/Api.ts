// import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
// import { store } from "../redux/store";
// import { logoutUser, refreshToken } from "../redux/auth/operations";
// import { toast } from "react-toastify";

// // export const API_URL = process.env.NEXT_PUBLIC_API_URL;
// export const API_URL = "";

// export const publicInstance = axios.create({
//   baseURL: API_URL,
//   headers: { "Content-Type": "application/json" },
//   withCredentials: true,
// });

// export const privateInstance = axios.create({
//   baseURL: API_URL,
//   headers: { "Content-Type": "application/json" },
//   withCredentials: true,
// });

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

//     const { isLoggedIn } = store.getState().auth;
//     if (!isLoggedIn) {
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
/***********************  перероблюю на некст***********************/

import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { store } from "../redux/store";
import { logoutUser, refreshToken } from "../redux/auth/operations";
import { toast } from "react-toastify";

const baseConfig = {
  baseURL: "",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

export const publicInstance = axios.create(baseConfig);
export const privateInstance = axios.create(baseConfig);

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
  config: InternalAxiosRequestConfig;
}[] = [];

const processQueue = (error: AxiosError | null) => {
  failedQueue.forEach(({ resolve, reject, config }) => {
    if (error) {
      reject(error);
    } else {
      resolve(privateInstance(config));
    }
  });
  failedQueue = [];
};

privateInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url?.includes("/api/users/refresh")
    ) {
      return Promise.reject(error);
    }

    const { isLoggedIn } = store.getState().auth;
    if (!isLoggedIn) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject, config: originalRequest });
      });
    }

    isRefreshing = true;

    try {
      await store.dispatch(refreshToken()).unwrap();
      toast.success("Сесію оновлено ✨");
      processQueue(null);
      return privateInstance(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError as AxiosError);
      await store.dispatch(logoutUser()).unwrap();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);
