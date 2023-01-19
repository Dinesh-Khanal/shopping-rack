import nodeMailer from "nodemailer";

const sendEmail = async (options: {
  email: string;
  subject: string;
  message: string;
}) => {
  const transporter = nodeMailer.createTransport({
    service: "Gmail",
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, //this is for port 587 (ie not secure http), for port 465 (https) it should be true
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  console.log(process.env.SMTP_HOST);
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
