import nodeMailer, { TransportOptions } from "nodemailer";
//First create an account in Sendinblue (https://sendinblue.com) for SMTP credentials
interface IOption {
  email: string;
  subject: string;
  message: string;
}
const sendEmail = async (options: IOption) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  } as TransportOptions);

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
