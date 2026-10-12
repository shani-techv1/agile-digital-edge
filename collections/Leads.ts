import type { CollectionConfig } from "payload";

export const Leads: CollectionConfig = {
  slug: "leads",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["createdAt", "company", "email", "platform", "crmStatus"],
  },
  access: {
    create: () => false,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "company", type: "text", required: true },
    { name: "website", type: "text", required: true },
    { name: "country", type: "text", required: true },
    { name: "platform", type: "text", required: true },
    { name: "requirement", type: "textarea", required: true },
    { name: "utmSource", type: "text" },
    { name: "utmMedium", type: "text" },
    { name: "utmCampaign", type: "text" },
    { name: "utmTerm", type: "text" },
    { name: "utmContent", type: "text" },
    { name: "gclid", type: "text" },
    { name: "referrer", type: "text" },
    { name: "landingPath", type: "text" },
    { name: "ip", type: "text" },
    {
      name: "crmStatus",
      type: "select",
      defaultValue: "skipped",
      options: ["skipped", "sent", "error"],
    },
    { name: "crmProvider", type: "text" },
  ],
};
