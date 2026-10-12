import { getPayloadClient } from "../payload";

export async function saveLead(data) {
  const payload = await getPayloadClient();
  return payload.create({
    collection: "leads",
    overrideAccess: true,
    data: {
      source: "audit",
      status: "new",
      crmStatus: "skipped",
      company: "Not provided",
      ...clean(data),
      company: text(data.company) || "Not provided",
    },
  });
}

function clean(data) {
  return Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined && value !== null && value !== ""),
  );
}

function text(value) {
  return typeof value === "string" && value.trim() ? value.trim() : "";
}
