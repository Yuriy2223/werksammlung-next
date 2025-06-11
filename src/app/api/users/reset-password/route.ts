// import { NextRequest, NextResponse } from "next/server";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { connectToDatabase } from "@/lib/mongodb";
// import { User } from "@/models/user";
// import { resetPasswordSchema } from "@/validation/userSchema";
// import { ValidationError } from "joi";

// interface JWTPayload {
//   sub: string;
//   email: string;
//   type: string;
//   exp: number;
// }

// export async function POST(req: NextRequest) {
//   try {
//     await connectToDatabase();
//     const body = await req.json();

//     try {
//       await resetPasswordSchema.validateAsync(body, { abortEarly: false });
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

//     const { token, password } = body;

//     const jwtSecret = process.env.JWT_SECRET;
//     if (!jwtSecret) {
//       console.error("JWT_SECRET is not configured");
//       return NextResponse.json(
//         { message: "Помилка конфігурації сервера" },
//         { status: 500 }
//       );
//     }

//     try {
//       const decoded = jwt.verify(token, jwtSecret) as JWTPayload;

//       if (decoded.type !== "password_reset") {
//         return NextResponse.json(
//           { message: "Недійсний тип токена" },
//           { status: 401 }
//         );
//       }

//       const user = await User.findById(decoded.sub);

//       if (!user) {
//         return NextResponse.json(
//           { message: "Користувача не знайдено" },
//           { status: 404 }
//         );
//       }

//       if (user.email !== decoded.email) {
//         return NextResponse.json(
//           { message: "Токен недійсний" },
//           { status: 401 }
//         );
//       }

//       const hashedPassword = await bcrypt.hash(password, 12);

//       await User.findByIdAndUpdate(user._id, {
//         password: hashedPassword,
//         passwordResetAt: new Date(),
//       });

//       return NextResponse.json(
//         {
//           message: "Пароль успішно скинуто",
//         },
//         { status: 200 }
//       );
//     } catch (jwtError: unknown) {
//       if (jwtError instanceof Error) {
//         if (jwtError.name === "JsonWebTokenError") {
//           return NextResponse.json(
//             { message: "Недійсний токен" },
//             { status: 401 }
//           );
//         }

//         if (jwtError.name === "TokenExpiredError") {
//           return NextResponse.json(
//             { message: "Термін дії токена закінчився" },
//             { status: 401 }
//           );
//         }
//       }

//       throw jwtError;
//     }
//   } catch (err) {
//     console.error("Reset password error:", err);
//     return NextResponse.json(
//       { message: "Внутрішня помилка сервера" },
//       { status: 500 }
//     );
//   }
// }

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

    // Validate request body
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
      return NextResponse.json({ message: "Невірний запит" }, { status: 400 });
    }

    const { token, password } = body;

    const jwtSecret = process.env.SECRET_PASSWORD;
    if (!jwtSecret) {
      console.error("SECRET_PASSWORD is not configured");
      return NextResponse.json(
        { message: "Помилка конфігурації сервера" },
        { status: 500 }
      );
    }

    try {
      // Verify and decode JWT token
      const decoded = jwt.verify(token, jwtSecret) as JWTPayload;

      // Check if token is for password reset
      if (decoded.type !== "password_reset") {
        return NextResponse.json(
          { message: "Недійсний тип токена" },
          { status: 401 }
        );
      }

      // Additional expiration check
      const now = Math.floor(Date.now() / 1000);
      if (decoded.exp < now) {
        return NextResponse.json(
          { message: "Термін дії токена закінчився" },
          { status: 401 }
        );
      }

      // Find user by ID from token
      const user = await User.findById(decoded.sub);

      if (!user) {
        return NextResponse.json(
          { message: "Користувача не знайдено" },
          { status: 404 }
        );
      }

      // Verify email matches (additional security check)
      if (user.email !== decoded.email) {
        return NextResponse.json(
          { message: "Токен недійсний" },
          { status: 401 }
        );
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Update user password
      await User.findByIdAndUpdate(user._id, {
        password: hashedPassword,
        passwordResetAt: new Date(),
      });

      return NextResponse.json(
        {
          message: "Пароль успішно скинуто",
        },
        { status: 200 }
      );
    } catch (jwtError: unknown) {
      if (jwtError instanceof Error) {
        if (jwtError.name === "JsonWebTokenError") {
          return NextResponse.json(
            { message: "Недійсний токен" },
            { status: 401 }
          );
        }

        if (jwtError.name === "TokenExpiredError") {
          return NextResponse.json(
            { message: "Термін дії токена закінчився" },
            { status: 401 }
          );
        }
      }

      // Re-throw unknown errors
      throw jwtError;
    }
  } catch (err) {
    console.error("Reset password error:", err);
    return NextResponse.json(
      { message: "Внутрішня помилка сервера" },
      { status: 500 }
    );
  }
}
