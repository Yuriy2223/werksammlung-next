import {
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
  requestResetPassword,
} from "../services/users.js";

export const registerController = async (req, res) => {
  const user = await registerUser(req.body);
  res
    .status(200)
    .json({ status: 200, message: "User successfully registered", data: user });
};

export const loginController = async (req, res) => {
  const session = await loginUser(req.body.email, req.body.password);

  res.cookie("sessionId", session._id, {
    httpOnly: true,
    expires: new Date(session.refreshTokenValidUntil),
    sameSite: "none",
    secure: true,
  });

  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: new Date(session.refreshTokenValidUntil),
    sameSite: "none",
    secure: true,
  });

  res.cookie("accessToken", session.accessToken, {
    httpOnly: true,
    expires: new Date(session.accessTokenValidUntil),
    sameSite: "none",
    secure: true,
  });

  res.status(200).json({
    status: 200,
    message: "User successfully logged",
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutController = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  if (typeof sessionId === "string" && typeof refreshToken === "string") {
    await logoutUser(sessionId, refreshToken);
  }

  res.clearCookie("sessionId", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  res.status(204).end();
};

export const currentUserController = async (req, res) => {
  res.json({
    status: 200,
    message: "Current user fetched successfully",
    data: req.user,
  });
};

export const refreshController = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  const session = await refreshSession(sessionId, refreshToken);

  res.cookie("sessionId", session._id, {
    httpOnly: true,
    expires: new Date(session.refreshTokenValidUntil),
    sameSite: "none",
    secure: true,
  });

  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: new Date(session.refreshTokenValidUntil),
    sameSite: "none",
    secure: true,
  });

  res.cookie("accessToken", session.accessToken, {
    httpOnly: true,
    expires: new Date(session.accessTokenValidUntil),
    sameSite: "none",
    secure: true,
  });

  res.status(200).json({
    status: 200,
    message: "Session refreshed",
  });
};

export const requestPasswordResetController = async (req, res) => {
  const { email } = req.body;

  await requestResetPassword(email);

  res.json({ status: 200, message: "Reset password email sent successfully" });
};

export const resetPasswordController = async (req, res) => {
  const { token, password } = req.body;

  await resetPassword(token, password);

  res.send("Reset password");
};
import * as fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import handlebars from "handlebars";
import createHttpError from "http-errors";
import { User } from "../models/user.js";
import { Session } from "../models/session.js";
import { sendEmail } from "../utils/sendEmail.js";
import { getEnvVar } from "../utils/getEnvVar.js";

const RESET_PASSWORD_TEMPLATE = fs.readFileSync(
  path.resolve("src/templates/reset-password.hbs"),
  { encoding: "UTF-8" }
);

const ACCESS_TOKEN_LIFETIME_MS = parseInt(
  getEnvVar("ACCESS_TOKEN_LIFETIME_MS"),
  10
);
const REFRESH_TOKEN_LIFETIME_MS = parseInt(
  getEnvVar("REFRESH_TOKEN_LIFETIME_MS"),
  10
);
const JWT_RESET_TOKEN_EXPIRES_IN = getEnvVar("JWT_RESET_TOKEN_EXPIRES_IN");

export async function registerUser(payload) {
  const user = await User.findOne({ email: payload.email });

  if (user !== null) {
    throw createHttpError.Conflict("Email is already exists");
  }

  payload.password = await bcrypt.hash(payload.password, 10);

  return User.create(payload);
}

export async function loginUser(email, password) {
  const user = await User.findOne({ email });

  if (user === null) {
    throw createHttpError.Unauthorized("Email or password is incorrect");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw createHttpError.Unauthorized("Email or password is incorrect");
  }

  await Session.deleteOne({ userId: user._id });

  return Session.create({
    userId: user._id,
    accessToken: crypto.randomBytes(30).toString("base64"),
    refreshToken: crypto.randomBytes(30).toString("base64"),
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_LIFETIME_MS),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_LIFETIME_MS),
  });
}

export async function logoutUser(sessionId, refreshToken) {
  await Session.deleteOne({ _id: sessionId, refreshToken });

  return undefined;
}

export async function refreshSession(sessionId, refreshToken) {
  const currentSession = await Session.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (currentSession === null) {
    throw createHttpError.Unauthorized("Session not found");
  }

  if (currentSession.refreshTokenValidUntil < new Date()) {
    throw createHttpError.Unauthorized("Refresh token is expired");
  }

  await Session.deleteOne({
    _id: currentSession._id,
    refreshToken: currentSession.refreshToken,
  });

  return Session.create({
    userId: currentSession.userId,
    accessToken: crypto.randomBytes(30).toString("base64"),
    refreshToken: crypto.randomBytes(30).toString("base64"),
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_LIFETIME_MS),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_LIFETIME_MS),
  });
}

export async function requestResetPassword(email) {
  const user = await User.findOne({ email });

  if (user === null) {
    throw createHttpError.NotFound("User not found");
  }

  const resetToken = jwt.sign(
    { sub: user._id, name: user.name },
    getEnvVar("JWT_SECRET"),
    {
      expiresIn: JWT_RESET_TOKEN_EXPIRES_IN,
    }
  );

  const template = handlebars.compile(RESET_PASSWORD_TEMPLATE);

  await sendEmail(email, "Reset your password", template({ resetToken }));
}

export async function resetPassword(token, newPassword) {
  try {
    const decoded = jwt.verify(token, getEnvVar("JWT_SECRET"));
    const user = await User.findById(decoded.sub);

    if (user === null) {
      throw createHttpError.NotFound("User not found");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(user._id, { password: hashedPassword });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      throw createHttpError.Unauthorized("Token is unauthorized");
    }

    if (error.name === "TokenExpiredError") {
      throw createHttpError.Unauthorized("Token is expired");
    }

    throw error;
  }
}
