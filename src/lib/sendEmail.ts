import nodemailer from "nodemailer";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export const sendEmail = async ({ name, email, message }: ContactFormData) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.SMTP_TO,
    subject: "Message from the portfolio form",
    replyTo: email,
    text: `From: ${name} (${email})\n\n${message}`,
    html: generateEmailTemplate(name, email, message),
  };

  await transporter.sendMail(mailOptions);
};

function generateEmailTemplate(name: string, email: string, message: string) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <style>
      body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
      .container { background: #fff; padding: 20px; border-radius: 8px; }
      .label { font-weight: bold; margin-top: 10px; }
      .value { margin-bottom: 15px; }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>New Contact Message</h2>
      <div class="label">Name:</div>
      <div class="value">${name}</div>
      <div class="label">Email:</div>
      <div class="value"><a href="mailto:${email}">${email}</a></div>
      <div class="label">Message:</div>
      <div class="value" style="white-space: pre-line;">${message}</div>
    </div>
  </body>
  </html>
  `;
}
