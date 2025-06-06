import { contactMeFormData } from "@/types";
import * as yup from "yup";
// import { contactMeFormData } from "../App.type";

export const contactSchema = (
  t: (key: string) => string
): yup.ObjectSchema<contactMeFormData> =>
  yup.object({
    name: yup
      .string()
      .trim()
      .min(2, t("validation.name.tooShort"))
      .matches(/^[\p{L}' ]+$/u, t("validation.name.invalid"))
      .required(t("validation.name.required")),

    email: yup
      .string()
      .email(t("validation.email.invalid"))
      .max(254, t("validation.email.tooLong"))
      .required(t("validation.email.required")),

    message: yup
      .string()
      .trim()
      .min(10, t("validation.message.tooShort"))
      .required(t("validation.message.required")),
  });
