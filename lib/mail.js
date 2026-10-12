import nodemailer from "nodemailer";

export function oneLine(value) {
  return String(value ?? "").replace(/[\r\n]+/g, " ").slice(0, 180);
}

export function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function getMailer() {
  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
  const port = Number(process.env.SMTP_PORT || 465);

  if (!user || !pass) {
    throw new Error("SMTP credentials are not configured.");
  }

  return {
    user,
    transporter: nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port,
      secure: port === 465,
      auth: { user, pass },
    }),
  };
}
