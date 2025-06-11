import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Session } from "@/models/session";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const sessionId = req.cookies.get("sessionId")?.value;
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (typeof sessionId === "string" && typeof refreshToken === "string") {
      const session = await Session.findById(sessionId);

      if (
        session &&
        session.refreshToken === refreshToken &&
        new Date(session.refreshTokenValidUntil) > new Date()
      ) {
        await Session.deleteOne({ _id: sessionId });
      }
    }

    const res = new NextResponse(null, { status: 204 });

    res.cookies.set("sessionId", "", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      expires: new Date(0),
    });

    res.cookies.set("refreshToken", "", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      expires: new Date(0),
    });

    res.cookies.set("accessToken", "", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      expires: new Date(0),
    });

    return res;
  } catch (err) {
    console.error("Logout error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
