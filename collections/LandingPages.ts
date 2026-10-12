import type { Access, CollectionConfig, Field } from "payload";

const publishedOrLoggedIn: Access = ({ req }) => {
  if (req.user) return true;
  return { _status: { equals: "published" } };
};

export const RESERVED_SLUGS = new Set([
  "admin",
  "api",
  "about",
  "blogs",
  "case-studies",
  "contact",
  "free-ecommerce-audit",
  "industries",
  "ppc-packages",
  "privacy-policy",
  "seo-packages",
  "services",
  "smo-packages",
  "solutions",
  "success-stories",
  "terms-and-conditions",
  "web-packages",
  "white-label-software-developer",
  "why-agile",
  "work",
]);

export const INTENDED_SLUGS = [
  "shopify-development",
  "shopify-plus-development",
  "shopify-website-redesign",
  "shopify-speed-optimization",
  "shopify-custom-development",
  "shopify-app-development",
  "shopify-maintenance-support",
  "bigcommerce-development",
  "woocommerce-development",
  "shopify-migration",
  "bigcommerce-migration",
  "woocommerce-migration",
  "shopify-development-australia",
  "white-label-development",
  "white-label-shopify-development",
  "white-label-wordpress-development",
  "agency-development-partner",
  "hire-dedicated-developers",
];

function pointArray(name: string): Field {
  return {
    name,
    type: "array",
    fields: [
      { name: "title", type: "text", required: true },
      { name: "description", type: "textarea" },
    ],
  };
}

export const LandingPages: CollectionConfig = {
  slug: "landingPages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "pageType", "_status"],
    description: `Publishing a document creates its public URL. Leave it as a draft until the hero, problem, solution, and services or FAQs are filled in. Intended slugs: ${INTENDED_SLUGS.join(", ")}.`,
  },
  versions: {
    drafts: true,
  },
  access: {
    read: publishedOrLoggedIn,
  },
  hooks: {
    beforeChange: [
      async ({ data, originalDoc }) => {
        const { guardLandingPublish } = await import("../lib/revalidate");
        return guardLandingPublish({ data, originalDoc });
      },
    ],
    afterChange: [
      async ({ doc, previousDoc }) => {
        const { revalidatePaths } = await import("../lib/revalidate");
        const paths = ["/sitemap.xml", "/solutions"];
        if (doc?.slug) paths.push(`/${doc.slug}`);
        if (previousDoc?.slug && previousDoc.slug !== doc?.slug) paths.push(`/${previousDoc.slug}`);
        revalidatePaths(paths);
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        const { revalidatePaths } = await import("../lib/revalidate");
        revalidatePaths([doc?.slug ? `/${doc.slug}` : "/", "/solutions", "/sitemap.xml"]);
      },
    ],
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { description: "Public path, without a leading slash. Example: shopify-development" },
      validate: (value: unknown) => {
        if (typeof value !== "string" || !value) return "Enter a slug.";
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
          return "Use lowercase letters, numbers, and hyphens.";
        }
        if (RESERVED_SLUGS.has(value)) return "This slug is already used by a fixed page.";
        return true;
      },
    },
    {
      name: "pageType",
      type: "select",
      required: true,
      defaultValue: "service",
      options: [
        { label: "Service", value: "service" },
        { label: "Migration", value: "migration" },
        { label: "Location", value: "location" },
        { label: "Agency / white label", value: "agency" },
        { label: "Solution", value: "solution" },
      ],
    },
    {
      name: "platform",
      type: "select",
      options: [
        { label: "Shopify", value: "shopify" },
        { label: "Shopify Plus", value: "shopify-plus" },
        { label: "BigCommerce", value: "bigcommerce" },
        { label: "WooCommerce", value: "woocommerce" },
        { label: "WordPress", value: "wordpress" },
        { label: "Magento", value: "magento" },
        { label: "Multiple", value: "multi" },
        { label: "None", value: "none" },
      ],
    },
    {
      name: "showOnSolutionsHub",
      type: "checkbox",
      label: "Show on the solutions hub",
      defaultValue: false,
    },
    {
      name: "location",
      type: "group",
      admin: { condition: (data) => data?.pageType === "location" },
      fields: [
        { name: "country", type: "text" },
        { name: "region", type: "text" },
      ],
    },
    {
      name: "parent",
      type: "relationship",
      relationTo: "landingPages",
      admin: { description: "Location pages should point at the parent service." },
    },
    {
      name: "hero",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text" },
        { name: "heading", type: "text" },
        { name: "subheading", type: "textarea" },
        { name: "primaryCtaLabel", type: "text" },
        { name: "primaryCtaHref", type: "text" },
        { name: "secondaryCtaLabel", type: "text" },
        { name: "secondaryCtaHref", type: "text" },
        { name: "image", type: "upload", relationTo: "media" },
      ],
    },
    {
      name: "logos",
      type: "array",
      labels: { singular: "Logo", plural: "Logos" },
      fields: [
        { name: "name", type: "text", required: true },
        { name: "image", type: "upload", relationTo: "media" },
      ],
    },
    {
      name: "problem",
      type: "group",
      fields: [
        { name: "heading", type: "text" },
        { name: "body", type: "textarea" },
        pointArray("points"),
      ],
    },
    {
      name: "solution",
      type: "group",
      fields: [
        { name: "heading", type: "text" },
        { name: "body", type: "textarea" },
        pointArray("points"),
      ],
    },
    {
      name: "services",
      type: "group",
      fields: [
        { name: "heading", type: "text" },
        pointArray("items"),
      ],
    },
    {
      name: "technologies",
      type: "array",
      fields: [{ name: "name", type: "text", required: true }],
    },
    {
      name: "integrations",
      type: "array",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "logo", type: "upload", relationTo: "media" },
      ],
    },
    {
      name: "process",
      type: "group",
      fields: [
        { name: "heading", type: "text" },
        pointArray("steps"),
      ],
    },
    {
      name: "caseStudies",
      type: "relationship",
      relationTo: "caseStudies",
      hasMany: true,
    },
    {
      name: "testimonials",
      type: "array",
      fields: [
        { name: "quote", type: "textarea", required: true },
        { name: "name", type: "text", required: true },
        { name: "role", type: "text" },
        { name: "company", type: "text" },
      ],
    },
    {
      name: "faqs",
      type: "array",
      fields: [
        { name: "question", type: "text", required: true },
        { name: "answer", type: "textarea", required: true },
      ],
    },
    {
      name: "cta",
      type: "group",
      fields: [
        { name: "heading", type: "text" },
        { name: "body", type: "textarea" },
        { name: "buttonLabel", type: "text" },
        { name: "buttonHref", type: "text" },
      ],
    },
  ],
};
