import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "siteSettings",
  label: "Site settings",
  fields: [
    { name: "organizationName", type: "text" },
    { name: "siteUrl", type: "text" },
    { name: "email", type: "email" },
    { name: "telephone", type: "text" },
    { name: "streetAddress", type: "text" },
    { name: "addressLocality", type: "text" },
    { name: "addressRegion", type: "text" },
    { name: "postalCode", type: "text" },
    { name: "addressCountry", type: "text" },
    {
      name: "sameAs",
      type: "array",
      fields: [{ name: "url", type: "text", required: true }],
    },
  ],
};

export const SolutionsHub: GlobalConfig = {
  slug: "solutionsHub",
  label: "Solutions hub",
  fields: [
    { name: "heading", type: "text" },
    { name: "intro", type: "textarea" },
    { name: "supporting", type: "textarea" },
  ],
};

export const IndustriesHub: GlobalConfig = {
  slug: "industriesHub",
  label: "Industries hub",
  fields: [
    { name: "heading", type: "text" },
    { name: "intro", type: "textarea" },
    { name: "supporting", type: "textarea" },
  ],
};

export const AuditPage: GlobalConfig = {
  slug: "auditPage",
  label: "Free ecommerce audit",
  fields: [
    { name: "heading", type: "text" },
    { name: "intro", type: "textarea" },
    { name: "submitLabel", type: "text" },
  ],
};
