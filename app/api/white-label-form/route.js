import { NextResponse } from "next/server";
import { escapeHtml, getMailer, oneLine } from "../../../lib/mail";
import { saveLead } from "../../../lib/leads/saveLead";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, company, country, teamSize, services, message } = body;
    await saveLead({
      name,
      email,
      company,
      country,
      platform: services,
      requirement: [message, teamSize && `Team size: ${teamSize}`].filter(Boolean).join("\n"),
      source: "white-label",
      landingPath: body.landingPath || "/white-label-software-developer",
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
      from: `"Partnership Application" <${user}>`,
      replyTo: email,
      to: user,
      subject: `New White Label Partnership Inquiry from ${oneLine(name)}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #007bff;">New White Label Partnership Application</h2>
          <p><strong>Full Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Work Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Company:</strong> ${escapeHtml(company)}</p>
          <p><strong>Country:</strong> ${escapeHtml(country || "Not specified")}</p>
          <p><strong>Team Size:</strong> ${escapeHtml(teamSize || "Not specified")}</p>
          <p><strong>Services Interested In:</strong> ${escapeHtml(services || "None selected")}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p><strong>Message / Project Details:</strong></p>
          <p style="background: #f8f9fa; padding: 15px; border-radius: 5px;">${escapeHtml(message)}</p>
        </div>
      `,
    });

    return NextResponse.json({ message: "Enquiry sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending white-label enquiry:", error);
    return NextResponse.json({ message: "Error sending enquiry" }, { status: 500 });
  }
}
