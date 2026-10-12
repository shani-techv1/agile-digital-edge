import type { Access, CollectionConfig } from "payload";

const publishedOrLoggedIn: Access = ({ req }) => {
  if (req.user) return true;
  return { _status: { equals: "published" } };
};

export const CaseStudies: CollectionConfig = {
  slug: "caseStudies",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "client", "slug", "_status"],
  },
  versions: { drafts: true },
  access: { read: publishedOrLoggedIn },
  hooks: {
    afterChange: [
      async ({ doc, previousDoc }) => {
        const { revalidatePaths } = await import("../lib/revalidate");
        const paths = ["/case-studies", "/sitemap.xml"];
        if (doc?.slug) paths.push(`/case-studies/${doc.slug}`);
        if (previousDoc?.slug && previousDoc.slug !== doc?.slug) paths.push(`/case-studies/${previousDoc.slug}`);
        revalidatePaths(paths);
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        const { revalidatePaths } = await import("../lib/revalidate");
        revalidatePaths([
          doc?.slug ? `/case-studies/${doc.slug}` : "/case-studies",
          "/case-studies",
          "/sitemap.xml",
        ]);
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
      validate: (value: unknown) =>
        typeof value === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
          ? true
          : "Use lowercase letters, numbers, and hyphens.",
    },
    { name: "client", type: "text", required: true },
    { name: "logo", type: "upload", relationTo: "media" },
    { name: "industry", type: "text" },
    { name: "platform", type: "text" },
    { name: "services", type: "text", hasMany: true },
    { name: "challenge", type: "textarea" },
    { name: "existingPlatform", type: "text", label: "Existing platform" },
    { name: "requirements", type: "textarea" },
    { name: "solution", type: "textarea" },
    {
      name: "features",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea" },
      ],
    },
    {
      name: "integrations",
      type: "array",
      fields: [{ name: "name", type: "text", required: true }],
    },
    {
      name: "results",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "value", type: "text", required: true },
      ],
    },
    {
      name: "screenshots",
      type: "array",
      fields: [
        { name: "image", type: "upload", relationTo: "media" },
        { name: "imageUrl", type: "text", label: "Image URL" },
        { name: "alt", type: "text" },
      ],
    },
    { name: "technology", type: "text", hasMany: true },
    {
      name: "testimonial",
      type: "group",
      fields: [
        { name: "quote", type: "textarea" },
        { name: "name", type: "text" },
        { name: "role", type: "text" },
      ],
    },
    { name: "related", type: "relationship", relationTo: "caseStudies", hasMany: true },
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
