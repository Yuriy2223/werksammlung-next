import { NextRequest } from "next/server";
import { Session } from "@/models/session";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export const createErrorResponse = (status: number, message: string) => {
  return NextResponse.json({ status, message }, { status });
};

export const authCookie = async (request: NextRequest) => {
  const accessToken = request.cookies.get("accessToken")?.value;

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
