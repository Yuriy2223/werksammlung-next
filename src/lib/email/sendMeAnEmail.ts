import nodemailer from "nodemailer";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export const sendMeAnEmail = async ({
  name,
  email,
  message,
}: ContactFormData) => {
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
/************************************************************** */
// import nodemailer from "nodemailer";

// type ContactFormData = {
//   name: string;
//   email: string;
//   message: string;
// };

// type EmailData = {
//   to: string;
//   subject: string;
//   html: string;
//   from?: string;
// };

// // Original function for contact form
// export const sendContactEmail = async ({
//   name,
//   email,
//   message,
// }: ContactFormData) => {
//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: Number(process.env.SMTP_PORT),
//     secure: true,
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASSWORD,
//     },
//   });

//   const mailOptions = {
//     from: `"${name}" <${email}>`,
//     to: process.env.SMTP_TO,
//     subject: "Message from the portfolio form",
//     replyTo: email,
//     text: `From: ${name} (${email})\n\n${message}`,
//     html: generateContactEmailTemplate(name, email, message),
//   };

//   await transporter.sendMail(mailOptions);
// };

// // New generic function for password reset and other emails
// export const sendEmail = async (
//   to: string,
//   subject: string,
//   html: string,
//   from?: string
// ) => {
//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: Number(process.env.SMTP_PORT),
//     secure: true,
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASSWORD,
//     },
//   });

//   const mailOptions = {
//     from: from || process.env.SMTP_USER,
//     to,
//     subject,
//     html,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log(`Email sent successfully to ${to}`);
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw new Error("Failed to send email");
//   }
// };

// // Alternative: Universal function that handles both cases
// export const sendUniversalEmail = async (
//   emailData: ContactFormData | EmailData
// ) => {
//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: Number(process.env.SMTP_PORT),
//     secure: true,
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASSWORD,
//     },
//   });

//   let mailOptions;

//   // Check if it's contact form data
//   if ("name" in emailData && "message" in emailData) {
//     const { name, email, message } = emailData;
//     mailOptions = {
//       from: `"${name}" <${email}>`,
//       to: process.env.SMTP_TO,
//       subject: "Message from the portfolio form",
//       replyTo: email,
//       text: `From: ${name} (${email})\n\n${message}`,
//       html: generateContactEmailTemplate(name, email, message),
//     };
//   } else {
//     // It's generic email data
//     const { to, subject, html, from } = emailData;
//     mailOptions = {
//       from: from || process.env.SMTP_USER,
//       to,
//       subject,
//       html,
//     };
//   }

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log(`Email sent successfully`);
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw new Error("Failed to send email");
//   }
// };

// function generateContactEmailTemplate(
//   name: string,
//   email: string,
//   message: string
// ) {
//   return `
//   <!DOCTYPE html>
//   <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <style>
//       body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
//       .container { background: #fff; padding: 20px; border-radius: 8px; }
//       .label { font-weight: bold; margin-top: 10px; }
//       .value { margin-bottom: 15px; }
//     </style>
//   </head>
//   <body>
//     <div class="container">
//       <h2>New Contact Message</h2>
//       <div class="label">Name:</div>
//       <div class="value">${name}</div>
//       <div class="label">Email:</div>
//       <div class="value"><a href="mailto:${email}">${email}</a></div>
//       <div class="label">Message:</div>
//       <div class="value" style="white-space: pre-line;">${message}</div>
//     </div>
//   </body>
//   </html>
//   `;
// }

// /*********************************************************************** */
