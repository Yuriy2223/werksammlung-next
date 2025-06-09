import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/sendEmail";
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

    await sendEmail(value);

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// import { NextRequest, NextResponse } from "next/server";
// import { sendEmail } from "@/lib/sendEmail";
// import { contactMeSchema } from "@/validation/contactMeSchema";
// import { ValidationError } from "joi";

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();

//     const value = await contactMeSchema.validateAsync(body, {
//       abortEarly: false,
//     });

//     await sendEmail(value);

//     return NextResponse.json({ message: "Email sent successfully" });
//   } catch (err) {
//     if (err instanceof ValidationError) {
//       const messages = err.details.map((d) => d.message);
//       return NextResponse.json({ errors: messages }, { status: 400 });
//     }

//     console.error("Email send error:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
