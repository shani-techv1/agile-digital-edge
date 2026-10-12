import { escapeHtml, getMailer, oneLine } from "../mail";

export async function submitLead(lead) {
  await sendLeadEmail(lead);
  const providerName = process.env.CRM_PROVIDER;
  if (!providerName || !crmProviders[providerName]) {
    return { crmStatus: "skipped", crmProvider: providerName || "" };
  }

  await crmProviders[providerName](lead);
  return { crmStatus: "sent", crmProvider: providerName };
}

async function sendLeadEmail(lead) {
  const { transporter, user } = getMailer();
  const rows = [
    ["Name", lead.name],
    ["Business email", lead.email],
    ["Company", lead.company],
    ["Website", lead.website],
    ["Country", lead.country],
    ["Ecommerce platform", lead.platform],
    ["Requirement", lead.requirement],
    ["UTM source", lead.utmSource],
    ["UTM medium", lead.utmMedium],
    ["UTM campaign", lead.utmCampaign],
    ["UTM term", lead.utmTerm],
    ["UTM content", lead.utmContent],
    ["GCLID", lead.gclid],
    ["Referrer", lead.referrer],
    ["Landing path", lead.landingPath],
  ];

  const html = `
    <h2>Free ecommerce audit request</h2>
    ${rows
      .map(
        ([label, value]) =>
          `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value || "Not provided")}</p>`,
      )
      .join("")}
  `;

  await transporter.sendMail({
    from: `"Website Audit" <${user}>`,
    replyTo: lead.email,
    to: user,
    cc: "shani@agiledigitaledge.com",
    subject: `Free ecommerce audit — ${oneLine(lead.company)}`,
    html,
  });
}

const crmProviders = {};
