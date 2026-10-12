import { NextResponse } from "next/server";
import { escapeHtml, getMailer, oneLine } from "../../../lib/mail";
import { saveLead } from "../../../lib/leads/saveLead";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, company, email, phone, service, budget, message } = body;
    await saveLead({
      name,
      email,
      company,
      platform: service,
      requirement: [message, budget && `Budget: ${budget}`, phone && `Phone: ${phone}`].filter(Boolean).join("\n"),
      source: "contact",
      landingPath: body.landingPath || "/contact",
      utmSource: body.utmSource,
      utmMedium: body.utmMedium,
      utmCampaign: body.utmCampaign,
      utmTerm: body.utmTerm,
      utmContent: body.utmContent,
      gclid: body.gclid,
      referrer: body.referrer,
    });
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
