import nodemailer from "nodemailer";

const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

export const sendEmail = async ({ to, subject, html }) => {
  const transporter = createTransporter();

  if (!transporter) {
    return { skipped: true };
  }

  await transporter.sendMail({
    from: `"EventSphere" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  });

  return { skipped: false };
};
