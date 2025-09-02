import { AxiosHeaders } from "axios";
import { publicInstance, createReduxApiCall } from "./httpClient";
import {
  LoginData,
  RegisterData,
  RequestResetData,
  ResetPasswordData,
  User,
} from "@/types";

export const registerUserApi = async (
  data: RegisterData
): Promise<{ user: User }> => {
  const res = await publicInstance.post("/api/users/signup", data);
  return res.data;
};

export const loginUserApi = async (
  data: LoginData
): Promise<{ user: User }> => {
  const res = await publicInstance.post("/api/users/signin", data);
  return res.data;
};

export const logoutApi = async (): Promise<void> => {
  await createReduxApiCall<void>({
    method: "post",
    url: "/api/users/signout",
    headers: new AxiosHeaders({ "Content-Type": "application/json" }),
  });
};

export const refreshTokenApi = async (): Promise<void> => {
  await createReduxApiCall({
    method: "post",
    url: "/api/users/refresh",
    headers: new AxiosHeaders({ "Content-Type": "application/json" }),
  });
};

export const requestPasswordResetApi = async (
  data: RequestResetData
): Promise<{ message: string }> => {
  const res = await publicInstance.post(
    "/api/users/request-password-reset",
    data
  );
  return res.data;
};

export const resetPasswordApi = async (
  data: ResetPasswordData
): Promise<{ message: string }> => {
  const res = await publicInstance.post("/api/users/reset-password", data);
  return res.data;
};
