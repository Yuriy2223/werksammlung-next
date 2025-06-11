import { NextResponse } from "next/server";
import { Session } from "@/models/session";
import { User } from "@/models/user";

export const createErrorResponse = (status: number, message: string) => {
  return NextResponse.json({ status, message }, { status });
};

export const authCookie = async (request: Request) => {
  const cookieHeader = request.headers.get("cookie");

  if (!cookieHeader) {
    return createErrorResponse(401, "No cookies found");
  }

  const cookies = Object.fromEntries(
    cookieHeader.split(";").map((cookie) => {
      const [name, ...rest] = cookie.trim().split("=");
      return [name, rest.join("=")];
    })
  );

  const accessToken = cookies["accessToken"];

  if (!accessToken) {
    return createErrorResponse(401, "Please provide access token");
  }

  const session = await Session.findOne({ accessToken });

  if (!session) {
    return createErrorResponse(401, "Session not found");
  }

  if (session.accessTokenValidUntil < new Date()) {
    return createErrorResponse(401, "Access token is expired");
  }

  const user = await User.findById(session.userId);

  if (!user) {
    return createErrorResponse(401, "User not found");
  }

  return { user: { id: user._id, name: user.name } };
};
