import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/user";
import { Session } from "@/models/session";
import crypto from "crypto";
import { loginSchema } from "@/validation/userSchema";
import { ValidationError } from "joi";

const accessTokenMs = parseInt(process.env.ACCESS_TOKEN_LIFETIME_MS!, 10);
const refreshTokenMs = parseInt(process.env.REFRESH_TOKEN_LIFETIME_MS!, 10);

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    try {
      await loginSchema.validateAsync(body, { abortEarly: false });
    } catch (error) {
      if (error instanceof ValidationError) {
        const messages = error.details.map((d) => d.message);
        return NextResponse.json(
          { message: messages.join(", ") },
          { status: 400 }
        );
      }
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    const user = await User.findOne({ email: body.email });
    if (!user) {
      return NextResponse.json(
        { message: "Email or password is incorrect" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Email or password is incorrect" },
        { status: 401 }
      );
    }

    await Session.deleteOne({ userId: user._id });

    const session = await Session.create({
      userId: user._id,
      accessToken: crypto.randomBytes(30).toString("base64"),
      refreshToken: crypto.randomBytes(30).toString("base64"),
      accessTokenValidUntil: new Date(Date.now() + accessTokenMs),
      refreshTokenValidUntil: new Date(Date.now() + refreshTokenMs),
    });

    const res = NextResponse.json(
      {
        status: 200,
        message: "User successfully logged in",
        data: { accessToken: session.accessToken },
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
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
