// import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import { connectToDatabase } from "@/lib/mongodb";
// import { User } from "@/models/user";
// import { requestPasswordResetSchema } from "@/validation/userSchema";
// import { ValidationError } from "joi";
// import { sendPasswordResetEmail } from "@/lib/email/sendPasswordResetEmail";

// export async function POST(req: NextRequest) {
//   try {
//     await connectToDatabase();
//     const body = await req.json();

//     // Validate request body
//     try {
//       await requestPasswordResetSchema.validateAsync(body, {
//         abortEarly: false,
//       });
//     } catch (error) {
//       if (error instanceof ValidationError) {
//         const messages = error.details.map((d) => d.message);
//         return NextResponse.json(
//           { message: messages.join(", ") },
//           { status: 400 }
//         );
//       }
//       return NextResponse.json({ message: "Невірний запит" }, { status: 400 });
//     }

//     const { email } = body;

//     // Find user by email
//     const user = await User.findOne({ email });

//     if (!user) {
//       // Return success even if user not found for security reasons
//       // This prevents email enumeration attacks
//       return NextResponse.json(
//         {
//           message:
//             "Якщо обліковий запис з такою електронною поштою існує, ми надіслали посилання для скидання паролю.",
//         },
//         { status: 200 }
//       );
//     }

//     // Check for required environment variables
//     const jwtSecret = process.env.JWT_SECRET;
//     if (!jwtSecret) {
//       console.error("JWT_SECRET is not configured");
//       return NextResponse.json(
//         { message: "Помилка конфігурації сервера" },
//         { status: 500 }
//       );
//     }

//     const frontendUrl = process.env.API_URL;

//     // Create JWT payload with expiration
//     const payload = {
//       sub: user._id.toString(),
//       email: user.email,
//       type: "password_reset",
//       exp: Math.floor(Date.now() / 1000) + 15 * 60,
//     };

//     // Generate reset token
//     const resetToken = jwt.sign(payload, jwtSecret);

//     // Create reset URL
//     const resetUrl = `${frontendUrl}/reset-password?token=${resetToken}`;

//     // Send password reset email
//     try {
//       await sendPasswordResetEmail({
//         email: user.email,
//         resetUrl,
//         userName: user.name || "Користувач",
//       });
//     } catch (emailError) {
//       console.error("Failed to send password reset email:", emailError);
//       return NextResponse.json(
//         { message: "Помилка надсилання електронного листа" },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json(
//       {
//         message:
//           "Якщо обліковий запис з такою електронною поштою існує, ми надіслали посилання для скидання паролю.",
//       },
//       { status: 200 }
//     );
//   } catch (err) {
//     console.error("Request password reset error:", err);
//     return NextResponse.json(
//       { message: "Внутрішня помилка сервера" },
//       { status: 500 }
//     );
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/user";
import { requestPasswordResetSchema } from "@/validation/userSchema";
import { ValidationError } from "joi";
import { sendPasswordResetEmail } from "@/lib/email/sendPasswordResetEmail";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    // Validate request body
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
      return NextResponse.json({ message: "Невірний запит" }, { status: 400 });
    }

    const { email } = body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      // Return success even if user not found for security reasons
      // This prevents email enumeration attacks
      return NextResponse.json(
        {
          message:
            "Якщо обліковий запис з такою електронною поштою існує, ми надіслали посилання для скидання паролю.",
        },
        { status: 200 }
      );
    }

    // Check for required environment variables
    const jwtSecret = process.env.SECRET_PASSWORD;
    if (!jwtSecret) {
      return NextResponse.json(
        { message: "Помилка конфігурації сервера" },
        { status: 500 }
      );
    }

    const frontendUrl = process.env.API_URL;
    if (!frontendUrl) {
      return NextResponse.json(
        { message: "Помилка конфігурації сервера" },
        { status: 500 }
      );
    }

    // Create JWT payload with expiration (15 minutes)
    const payload = {
      sub: user._id.toString(),
      email: user.email,
      type: "password_reset",
      exp: Math.floor(Date.now() / 1000) + 15 * 60,
    };

    // Generate reset token
    const resetToken = jwt.sign(payload, jwtSecret);

    // Create reset URL - FIXED: Added backticks
    const resetUrl = `${frontendUrl}/reset-password?token=${resetToken}`;

    // Send password reset email
    try {
      await sendPasswordResetEmail({
        email: user.email,
        resetUrl,
        userName: user.name || "Користувач",
      });
    } catch (emailError) {
      console.error("Failed to send password reset email:", emailError);
      return NextResponse.json(
        { message: "Помилка надсилання електронного листа" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message:
          "Якщо обліковий запис з такою електронною поштою існує, ми надіслали посилання для скидання паролю.",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Request password reset error:", err);
    return NextResponse.json(
      { message: "Внутрішня помилка сервера" },
      { status: 500 }
    );
  }
}
