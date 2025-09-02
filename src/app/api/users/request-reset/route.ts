import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/models/user";
import { ValidationError } from "joi";
import { connectToDatabase } from "@/lib/mongodb";
import { requestPasswordResetSchema } from "@/validation/userSchema";
import { sendPasswordResetEmail } from "@/lib/email/sendPasswordResetEmail";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    try {
      await requestPasswordResetSchema.validateAsync(body, {
        abortEarly: false,
      });
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

    const { email } = body;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          message:
            "If an account with this email exists, we have sent a password reset link.",
        },
        { status: 200 }
      );
    }

    const jwtSecret = process.env.SECRET_PASSWORD;
    if (!jwtSecret) {
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    const frontendUrl = process.env.API_URL;
    if (!frontendUrl) {
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    const payload = {
      sub: user._id.toString(),
      email: user.email,
      type: "password_reset",
      exp: Math.floor(Date.now() / 1000) + 15 * 60,
    };

    const resetToken = jwt.sign(payload, jwtSecret);

    const resetUrl = `${frontendUrl}/reset-password?token=${resetToken}`;

    try {
      await sendPasswordResetEmail({
        email: user.email,
        resetUrl,
        userName: user.name || "User",
      });
    } catch (emailError) {
      console.error("Failed to send password reset email:", emailError);
      return NextResponse.json(
        { message: "Error sending email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message:
          "If an account with this email exists, we have sent a password reset link.",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Request password reset error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
