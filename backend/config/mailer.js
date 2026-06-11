import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const mailer = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

try {
  await mailer.verify();
  console.log("SMTP Connected");
} catch (error) {
  console.log("SMTP Error:", error.message);
}

export default mailer;