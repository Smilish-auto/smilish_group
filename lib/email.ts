import nodemailer from "nodemailer";

const NOTIFY_EMAIL = "smilishgroup@gmail.com";

function getTransporter() {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    return null;
  }
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

/**
 * Sends a notification email to smilishgroup@gmail.com. Fails silently
 * (logs, doesn't throw) if GMAIL_USER/GMAIL_APP_PASSWORD aren't configured
 * yet, or if sending fails for any reason — a lead is still saved to the
 * database either way, so a broken email setup never loses a submission.
 */
export async function sendNotificationEmail({ subject, html }: { subject: string; html: string }) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("Email not configured (GMAIL_USER/GMAIL_APP_PASSWORD missing) — skipping notification.");
    return;
  }

  try {
    await transporter.sendMail({
      from: `"Smilish Group Website" <${process.env.GMAIL_USER}>`,
      to: NOTIFY_EMAIL,
      subject,
      html,
    });
  } catch (err) {
    console.error("Failed to send notification email:", err);
  }
}

function row(label: string, value?: string | null) {
  if (!value) return "";
  return `<tr><td style="padding:6px 12px 6px 0;color:#0B1F3A99;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 0;color:#080808;font-size:14px">${value}</td></tr>`;
}

/** Builds a simple branded HTML table from an arbitrary label/value object. */
export function buildNotificationHtml(title: string, fields: Record<string, string | null | undefined>) {
  const rows = Object.entries(fields)
    .map(([label, value]) => row(label, value))
    .join("");

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto">
      <div style="background:#0B1F3A;padding:20px 24px;border-radius:12px 12px 0 0">
        <p style="color:#D4AF37;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;margin:0">Smilish Group Website</p>
        <p style="color:#fff;font-size:18px;font-weight:600;margin:6px 0 0">${title}</p>
      </div>
      <table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #eee;border-top:0;border-radius:0 0 12px 12px;padding:8px 24px">
        ${rows}
      </table>
    </div>
  `;
}
