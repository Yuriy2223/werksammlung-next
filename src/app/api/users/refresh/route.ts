import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Session } from "@/models/session";
import crypto from "crypto";

const accessTokenMs = parseInt(process.env.ACCESS_TOKEN_LIFETIME_MS!, 10);
const refreshTokenMs = parseInt(process.env.REFRESH_TOKEN_LIFETIME_MS!, 10);

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const sessionId = req.cookies.get("sessionId")?.value;
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (!sessionId || !refreshToken) {
      return NextResponse.json(
        { message: "No session or refresh token provided" },
        { status: 401 }
      );
    }

    const session = await Session.findById(sessionId);

    if (
      !session ||
      session.refreshToken !== refreshToken ||
      new Date(session.refreshTokenValidUntil) < new Date()
    ) {
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    }

    session.accessToken = crypto.randomBytes(30).toString("base64");
    session.refreshToken = crypto.randomBytes(30).toString("base64");
    session.accessTokenValidUntil = new Date(Date.now() + accessTokenMs);
    session.refreshTokenValidUntil = new Date(Date.now() + refreshTokenMs);
    await session.save();

    const res = NextResponse.json(
      {
        status: 200,
        message: "Session refreshed",
      },
      { status: 200 }
    );

    res.cookies.set("sessionId", session._id.toString(), {
      httpOnly: true,
      expires: session.refreshTokenValidUntil,
      sameSite: "none",
      secure: true,
    });

    res.cookies.set("refreshToken", session.refreshToken, {
      httpOnly: true,
      expires: session.refreshTokenValidUntil,
      sameSite: "none",
      secure: true,
    });

    res.cookies.set("accessToken", session.accessToken, {
      httpOnly: true,
      expires: session.accessTokenValidUntil,
      sameSite: "none",
      secure: true,
    });

    return res;
  } catch (error) {
    console.error("Refresh error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
