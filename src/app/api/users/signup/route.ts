// import bcrypt from "bcrypt";

// import createHttpError from "http-errors";
// import { User } from "../models/user.js";

// export const userRouters = express.Router();
// const jsonParser = express.json();

// userRouters.post(
//   "/signup",
//   jsonParser,
//   validateBody(registerSchema),
//   ctrlWrapper(registerController)
// );

// export const registerController = async (req, res) => {
//   const user = await registerUser(req.body);
//   res
//     .status(200)
//     .json({ status: 200, message: "User successfully registered", data: user });
// };

// export async function registerUser(payload) {
//   const user = await User.findOne({ email: payload.email });

//   if (user !== null) {
//     throw createHttpError.Conflict("Email is already exists");
//   }

//   payload.password = await bcrypt.hash(payload.password, 10);

//   return User.create(payload);
// }

// export const ctrlWrapper = (controller) => {
//   return async (req, res, next) => {
//     try {
//       await controller(req, res, next);
//     } catch (error) {
//       next(error);
//     }
//   };
// };

// import createHttpError from "http-errors";

// export const validateBody = (schema) => {
//   return async (req, _res, next) => {
//     try {
//       await schema.validateAsync(req.body, {
//         abortEarly: false,
//       });

//       next();
//     } catch (error) {
//       const errors = error.details.map((detail) => detail.message);

//       next(new createHttpError.BadRequest(errors));
//     }
//   };
// };

/*******************спроба оптимізувати******************************* */

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";

import { registerSchema } from "@/validation/userSchema";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/user";

type JoiValidationError = {
  details: { message: string }[];
};

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    try {
      await registerSchema.validateAsync(body, { abortEarly: false });
    } catch (error: unknown) {
      const validationError = error as JoiValidationError;
      const errors = validationError.details.map((detail) => detail.message);
      throw new createHttpError.BadRequest(errors.join(", "));
    }

    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      throw new createHttpError.Conflict("Email is already exists");
    }

    body.password = await bcrypt.hash(body.password, 10);
    const newUser = await User.create(body);

    return NextResponse.json(
      {
        status: 200,
        message: "User successfully registered",
        data: {
          id: newUser._id.toString(),
          email: newUser.email,
          name: newUser.name,
        },
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    if (createHttpError.isHttpError(err)) {
      return NextResponse.json(
        { message: err.message },
        { status: err.statusCode }
      );
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
