import mailer from "../config/mailer.js";

const sendEmail = async ({
  name,
  email,
  subject,
  message,
}) => {
  return await mailer.sendMail({
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    replyTo: email,
    subject,
    html: `
      <h2>Contact Form</h2>
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Message: ${message}</p>
    `,
  });
};

export default sendEmail;