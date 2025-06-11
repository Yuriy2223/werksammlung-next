// import nodemailer from "nodemailer";

// type PasswordResetData = {
//   email: string;
//   resetUrl: string;
//   userName: string;
// };

// export const sendPasswordResetEmail = async ({
//   email,
//   resetUrl,
//   userName,
// }: PasswordResetData) => {
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
//     from: `"${process.env.SMTP_FROM_NAME || "Your App"}" <${
//       process.env.SMTP_USER
//     }>`,
//     to: email,
//     subject: "Скидання паролю",
//     text: `Привіт ${userName},\n\n Ви запросили скидання паролю. Натисніть на посилання нижче, щоб скинути пароль:\n\n${resetUrl}\n\nЯкщо ви не запрошували це, просто ігноруйте цей лист.\n\nЗ повагою,\nКоманда сайту`,
//     html: generatePasswordResetEmailTemplate(userName, resetUrl),
//   };

//   await transporter.sendMail(mailOptions);
// };

// function generatePasswordResetEmailTemplate(
//   userName: string,
//   resetUrl: string
// ) {
//   return `
//   <!DOCTYPE html>
//   <html lang="uk">
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Скидання паролю</title>
//     <style>
//       body {
//         font-family: Arial, sans-serif;
//         background-color: #f4f4f4;
//         margin: 0;
//         padding: 20px;
//       }
//       .container {
//         max-width: 600px;
//         margin: 0 auto;
//         background: #fff;
//         padding: 30px;
//         border-radius: 8px;
//         box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//         text-align: center;
//       }
//       .header {
//         background-color: #4CAF50;
//         color: white;
//         padding: 20px;
//         border-radius: 8px;
//         margin-bottom: 30px;
//       }
//       .content {
//         color: #333;
//         line-height: 1.6;
//         margin-bottom: 30px;
//       }
//       .reset-button {
//         display: inline-block;
//         padding: 15px 30px;
//         font-size: 16px;
//         color: white;
//         background-color: #4CAF50;
//         text-decoration: none;
//         border-radius: 5px;
//         margin: 20px 0;
//         transition: background-color 0.3s;
//       }
//       .reset-button:hover {
//         background-color: #45a049;
//       }
//       .footer {
//         margin-top: 30px;
//         padding-top: 20px;
//         border-top: 1px solid #eee;
//         color: #666;
//         font-size: 14px;
//       }
//       .warning {
//         background-color: #fff3cd;
//         border: 1px solid #ffeaa7;
//         color: #856404;
//         padding: 15px;
//         border-radius: 4px;
//         margin-top: 20px;
//       }
//     </style>
//   </head>
//   <body>
//     <div class="container">
//       <div class="header">
//         <h2 style="margin: 0;">Скидання паролю</h2>
//       </div>

//       <div class="content">
//         <p>Привіт ${userName},</p>
//         <p>Ви запросили скидання паролю для вашого облікового запису. Натисніть кнопку нижче, щоб скинути пароль:</p>

//         <a href="${resetUrl}" class="reset-button">Скинути пароль</a>

//         <p>Якщо кнопка не працює, ви можете скопіювати і вставити це посилання у браузер:</p>
//         <p style="word-break: break-all; color: #4CAF50;">${resetUrl}</p>
//       </div>

//       <div class="warning">
//         <strong>Важливо:</strong> Це посилання дійсне протягом 15 хв. Якщо ви не запрошували скидання паролю, просто ігноруйте цей лист.
//       </div>

//       <div class="footer">
//         <p>З повагою,<br>Команда сайту</p>
//       </div>
//     </div>
//   </body>
//   </html>
//   `;
// }

/**************************************** */

import nodemailer from "nodemailer";

type PasswordResetData = {
  email: string;
  resetUrl: string;
  userName: string;
};

export const sendPasswordResetEmail = async ({
  email,
  resetUrl,
  userName,
}: PasswordResetData) => {
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
    from: `"${process.env.SMTP_FROM_NAME || "Your App"}" <${
      process.env.SMTP_USER
    }>`,
    to: email,
    subject: "Скидання паролю",
    text: `Привіт ${userName},

Ви запросили скидання паролю. Натисніть на посилання нижче, щоб скинути пароль:

${resetUrl}

Якщо ви не запрошували це, просто ігноруйте цей лист.

З повагою,
Команда сайту`,
    html: generatePasswordResetEmailTemplate(userName, resetUrl),
  };

  await transporter.sendMail(mailOptions);
};

function generatePasswordResetEmailTemplate(
  userName: string,
  resetUrl: string
): string {
  return `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Скидання паролю</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #fff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      text-align: center;
    }
    .header {
      background-color: #4CAF50;
      color: white;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 30px;
    }
    .content {
      color: #333;
      line-height: 1.6;
      margin-bottom: 30px;
    }
    .reset-button {
      display: inline-block;
      padding: 15px 30px;
      font-size: 16px;
      color: white;
      background-color: #4CAF50;
      text-decoration: none;
      border-radius: 5px;
      margin: 20px 0;
      transition: background-color 0.3s;
    }
    .reset-button:hover {
      background-color: #45a049;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #eee;
      color: #666;
      font-size: 14px;
    }
    .warning {
      background-color: #fff3cd;
      border: 1px solid #ffeaa7;
      color: #856404;
      padding: 15px;
      border-radius: 4px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">Скидання паролю</h2>
    </div>
    
    <div class="content">
      <p>Привіт ${userName},</p>
      <p>Ви запросили скидання паролю для вашого облікового запису. Натисніть кнопку нижче, щоб скинути пароль:</p>
      
      <a href="${resetUrl}" class="reset-button">Скинути пароль</a>
      
      <p>Якщо кнопка не працює, ви можете скопіювати і вставити це посилання у браузер:</p>
      <p style="word-break: break-all; color: #4CAF50;">${resetUrl}</p>
    </div>
    
    <div class="warning">
      <strong>Важливо:</strong> Це посилання дійсне протягом 15 хв. Якщо ви не запрошували скидання паролю, просто ігноруйте цей лист.
    </div>
    
    <div class="footer">
      <p>З повагою,<br>Команда сайту</p>
    </div>
  </div>
</body>
</html>`;
}
