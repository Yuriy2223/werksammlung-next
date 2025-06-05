import { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { extractErrorMessage } from "../../utils/errorUtils";
import {
  LoginData,
  RegisterData,
  RequestResetData,
  ResetPasswordData,
  User,
} from "../../App.type";
import {
  currentUserApi,
  loginUserApi,
  logoutApi,
  refreshTokenApi,
  registerUserApi,
  requestPasswordResetApi,
  resetPasswordApi,
} from "../../services/authApi";

export const registerUser = createAsyncThunk<
  User,
  RegisterData,
  { rejectValue: string }
>("auth/register", async (data, { rejectWithValue }) => {
  try {
    const { user } = await registerUserApi(data);
    return user;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error, "Registration failed"));
  }
});

export const loginUser = createAsyncThunk<
  User,
  LoginData,
  { rejectValue: string }
>("auth/login", async (data, { rejectWithValue }) => {
  try {
    const { user } = await loginUserApi(data);
    return user;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error, "Login failed"));
  }
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      return;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error, "Logout failed"));
    }
  }
);

export const refreshToken = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("auth/refresh", async (_, { rejectWithValue }) => {
  try {
    await refreshTokenApi();
    const user = await currentUserApi();
    return user;
  } catch (error) {
    const err = error as AxiosError;
    if (err.response?.status === 401) {
      return rejectWithValue("Session expired");
    }
    return rejectWithValue("Failed to refresh token");
  }
});

export const requestPasswordReset = createAsyncThunk<
  string,
  RequestResetData,
  { rejectValue: string }
>("auth/requestReset", async (data, { rejectWithValue }) => {
  try {
    const { message } = await requestPasswordResetApi(data);
    return message;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error, "Request failed"));
  }
});

export const resetPassword = createAsyncThunk<
  string,
  ResetPasswordData,
  { rejectValue: string }
>("auth/resetPassword", async (data, { rejectWithValue }) => {
  try {
    const { message } = await resetPasswordApi(data);
    return message;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error, "Reset failed"));
  }
});
