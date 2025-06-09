import nodemailer from "nodemailer";

export const contactController = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

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
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        body {
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
          font-family: Arial, sans-serif;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
        .header {
          color: #007BFF;
          margin-bottom: 20px;
        }
        .label {
          font-weight: bold;
          margin-top: 10px;
        }
        .value {
          margin-bottom: 15px;
        }
        @media (max-width: 600px) {
          .container {
            padding: 15px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2 class="header">New Contact Message</h2>
        <div class="label">Name:</div>
        <div class="value">${name}</div>
        <div class="label">Email:</div>
        <div class="value"><a href="mailto:${email}">${email}</a></div>
        <div class="label">Message:</div>
        <div class="value" style="white-space: pre-line;">${message}</div>
      </div>
    </body>
    </html>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Email send error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
};
