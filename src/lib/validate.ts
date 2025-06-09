// src/lib/validate.ts
import { ObjectSchema } from "joi";
import createHttpError from "http-errors";

export async function validateWithJoi(schema: ObjectSchema, body: any) {
  try {
    return await schema.validateAsync(body, { abortEarly: false });
  } catch (error: any) {
    const messages = error.details?.map((d: any) => d.message) || [
      "Invalid request",
    ];
    throw new createHttpError.BadRequest(messages.join("; "));
  }
}
