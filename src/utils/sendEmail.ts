import nodemailer from "nodemailer";
import { getEnvVar } from "./getEnvVar";

const transporter = nodemailer.createTransport({
  host: getEnvVar("SMTP_HOST"),
  port: Number(getEnvVar("SMTP_PORT")),
  secure: false,
  auth: {
    user: getEnvVar("SMTP_USER"),
    pass: getEnvVar("SMTP_PASSWORD"),
  },
});

export const sendEmail = (to: string, subject: string, content: string) => {
  return transporter.sendMail({
    from: getEnvVar("SENDER_EMAIL"),
    to,
    subject,
    html: content,
  });
};
