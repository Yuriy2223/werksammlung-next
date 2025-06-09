// lib/session.ts
import { IronSessionOptions } from "iron-session";
import { User } from "@/types";

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD!,
  cookieName: "auth_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}
