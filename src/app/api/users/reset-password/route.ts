import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/user";
import { resetPasswordSchema } from "@/validation/userSchema";
import { ValidationError } from "joi";

interface JWTPayload {
  sub: string;
  email: string;
  type: string;
  exp: number;
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    try {
      await resetPasswordSchema.validateAsync(body, { abortEarly: false });
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

    const { token, password } = body;
    const jwtSecret = process.env.SECRET_PASSWORD;
    if (!jwtSecret) {
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    try {
      const decoded = jwt.verify(token, jwtSecret) as JWTPayload;

      if (decoded.type !== "password_reset") {
        return NextResponse.json(
          { message: "Invalid token type" },
          { status: 401 }
        );
      }

      const now = Math.floor(Date.now() / 1000);
      if (decoded.exp < now) {
        return NextResponse.json({ message: "Token expired" }, { status: 401 });
      }

      const user = await User.findById(decoded.sub);

      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }

      if (user.email !== decoded.email) {
        return NextResponse.json(
          { message: "Token is invalid" },
          { status: 401 }
        );
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      await User.findByIdAndUpdate(user._id, {
        password: hashedPassword,
        passwordResetAt: new Date(),
      });

      return NextResponse.json(
        {
          message: "Password successfully reset",
        },
        { status: 200 }
      );
    } catch (jwtError: unknown) {
      if (jwtError instanceof Error) {
        if (jwtError.name === "JsonWebTokenError") {
          return NextResponse.json(
            { message: "Invalid token" },
            { status: 401 }
          );
        }

        if (jwtError.name === "TokenExpiredError") {
          return NextResponse.json(
            { message: "Token expired" },
            { status: 401 }
          );
        }
      }

      throw jwtError;
    }
  } catch (err) {
    console.error("Reset password error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
