import { cookies } from "next/headers";
import { Session } from "@/models/session";
import { User } from "@/models/user";

export async function authCookie() {
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) throw new Error("Access token missing");

  const session = await Session.findOne({ accessToken });
  if (!session || session.accessTokenValidUntil < new Date()) {
    throw new Error("Invalid or expired session");
  }

  const user = await User.findById(session.userId);
  if (!user) throw new Error("User not found");

  return user;
}
