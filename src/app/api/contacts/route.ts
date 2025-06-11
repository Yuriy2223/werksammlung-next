import { NextRequest, NextResponse } from "next/server";
import { sendMeAnEmail } from "@/lib/email/sendMeAnEmail";
import { contactMeSchema } from "@/validation/contactMeSchema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { error, value } = contactMeSchema.validate(body, {
      abortEarly: false,
    });
    if (error) {
      const messages = error.details.map((d) => d.message);
      return NextResponse.json({ errors: messages }, { status: 400 });
    }

    await sendMeAnEmail(value);

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
