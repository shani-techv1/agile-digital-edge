import { NextResponse } from "next/server";
import { escapeHtml, getMailer, oneLine } from "../../../lib/mail";

export async function POST(req) {
  try {
    const { name, company, email, phone, service, budget, message } = await req.json();
    const { transporter, user } = getMailer();

    await transporter.sendMail({
      from: `"Website Inquiry" <${user}>`,
      replyTo: email,
      to: user,
      cc: "shani@agiledigitaledge.com",
      subject: `New Project Inquiry from ${oneLine(name)} - ${oneLine(service)}`,
      html: `
        <h3>New Project Inquiry</h3>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Company:</strong> ${escapeHtml(company || "Not provided")}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
        <p><strong>Service Interest:</strong> ${escapeHtml(service || "Not specified")}</p>
        <p><strong>Budget Range:</strong> ${escapeHtml(budget || "Not specified")}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message)}</p>
      `,
    });

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "Error sending email" }, { status: 500 });
  }
}
