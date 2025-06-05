import * as yup from "yup";
import { SignUpData } from "../modals/SignUp/SignUp";

export const signUpSchema = (
  t: (key: string) => string
): yup.ObjectSchema<SignUpData> =>
  yup.object().shape({
    name: yup.string().required(t("modal.form.required")),
    email: yup
      .string()
      .email(t("modal.form.email_invalid"))
      .required(t("modal.form.required")),
    password: yup
      .string()
      .min(6, t("modal.form.password_short"))
      .required(t("modal.form.required")),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], t("modal.form.passwords_must_match"))
      .required(t("modal.form.required")),
  });
