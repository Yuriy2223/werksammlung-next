import { LoginData } from "@/types";
import * as yup from "yup";
// import { LoginData } from "../App.type";

export const singInSchema = (
  t: (key: string) => string
): yup.ObjectSchema<LoginData> =>
  yup.object({
    email: yup
      .string()
      .email(t("validation.email.invalid"))
      .max(254, t("validation.email.tooLong"))
      .required(t("validation.email.required")),

    password: yup
      .string()
      .trim()
      .min(6, t("validation.password.tooShort"))
      .max(20, t("validation.password.tooLong"))
      .matches(
        /^[\p{L}\d!@#$%^&*()_+=\-[\]{};:"\\|,.<>/?`~]+$/u,
        t("validation.password.invalid")
      )
      .required(t("validation.password.required")),
  });
