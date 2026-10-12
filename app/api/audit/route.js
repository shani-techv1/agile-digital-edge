import { NextResponse } from "next/server";
import { getPayloadClient } from "../../../lib/payload";
import { auditLeadSchema, fieldErrors } from "../../../lib/leads/validate";
import { submitLead } from "../../../lib/leads/submitLead";

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Send a JSON body." }, { status: 400 });
  }

  if (body.website_hp) {
    return NextResponse.json({ message: "Unable to submit the form." }, { status: 400 });
  }

  const started = Number(body.formStartedAt);
  if (!started || Date.now() - started < 2000 || started > Date.now() + 5000) {
    return NextResponse.json(
      { message: "Wait a moment and submit the form again.", errors: { formStartedAt: "Refresh the page and try again." } },
      { status: 400 },
    );
  }

  const parsed = auditLeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Check the highlighted fields.", errors: fieldErrors(parsed.error) },
      { status: 400 },
    );
  }

  const ip = clientIp(req);
  const payload = await getPayloadClient();
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const recent = await payload.count({
    collection: "leads",
    overrideAccess: true,
    where: {
      and: [{ ip: { equals: ip } }, { createdAt: { greater_than: since } }],
    },
  });

  if (recent.totalDocs >= 5) {
    return NextResponse.json({ message: "Too many requests. Try again later." }, { status: 429 });
  }

  const lead = parsed.data;
  const doc = await payload.create({
    collection: "leads",
    overrideAccess: true,
    data: {
      name: lead.name,
      email: lead.email,
      company: lead.company,
      website: lead.website,
      country: lead.country,
      platform: lead.platform,
      requirement: lead.requirement,
      utmSource: lead.utmSource,
      utmMedium: lead.utmMedium,
      utmCampaign: lead.utmCampaign,
      utmTerm: lead.utmTerm,
      utmContent: lead.utmContent,
      gclid: lead.gclid,
      referrer: lead.referrer,
      landingPath: lead.landingPath,
      ip,
      crmStatus: "skipped",
    },
  });

  try {
    const crm = await submitLead(lead);
    await payload.update({
      collection: "leads",
      id: doc.id,
      overrideAccess: true,
      data: crm,
    });
  } catch (error) {
    console.error("Audit email failed", error);
    return NextResponse.json({ message: "The request was saved, but the email could not be sent." }, { status: 500 });
  }

  return NextResponse.json({ message: "Request received." }, { status: 200 });
}

function clientIp(req) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}
