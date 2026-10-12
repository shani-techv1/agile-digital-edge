import type { Access, CollectionConfig } from "payload";

const publishedOrLoggedIn: Access = ({ req }) => {
  if (req.user) return true;
  return { _status: { equals: "published" } };
};

export const Industries: CollectionConfig = {
  slug: "industries",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "_status"],
    description: "Publishing an industry creates /industries/[slug]. Drafts stay off the site and out of the sitemap.",
  },
  versions: { drafts: true },
  access: { read: publishedOrLoggedIn },
  hooks: {
    afterChange: [
      async ({ doc, previousDoc }) => {
        const { revalidatePaths } = await import("../lib/revalidate");
        const paths = ["/industries", "/sitemap.xml"];
        if (doc?.slug) paths.push(`/industries/${doc.slug}`);
        if (previousDoc?.slug && previousDoc.slug !== doc?.slug) paths.push(`/industries/${previousDoc.slug}`);
        revalidatePaths(paths);
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        const { revalidatePaths } = await import("../lib/revalidate");
        revalidatePaths([doc?.slug ? `/industries/${doc.slug}` : "/industries", "/industries", "/sitemap.xml"]);
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
      validate: (value: unknown) => {
        if (typeof value !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
          return "Use lowercase letters, numbers, and hyphens.";
        }
        return true;
      },
    },
    {
      name: "hero",
      type: "group",
      fields: [
        { name: "heading", type: "text" },
        { name: "subheading", type: "textarea" },
        { name: "image", type: "upload", relationTo: "media" },
      ],
    },
    { name: "summary", type: "textarea" },
    { name: "body", type: "textarea" },
    { name: "relatedServices", type: "relationship", relationTo: "landingPages", hasMany: true },
    { name: "relatedCaseStudies", type: "relationship", relationTo: "caseStudies", hasMany: true },
  ],
};
