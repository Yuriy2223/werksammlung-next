import { publicInstance, privateInstance } from "./Api";
import {
  LoginData,
  RegisterData,
  RequestResetData,
  ResetPasswordData,
  User,
} from "../App.type";

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
  await publicInstance.post("/api/users/signout");
};

export const refreshTokenApi = async (): Promise<void> => {
  await publicInstance.post("/api/users/refresh");
};

export const currentUserApi = async (): Promise<User> => {
  const res = await privateInstance.get("/api/users/current");
  return res.data;
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
