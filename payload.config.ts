import path from "path";
import { fileURLToPath } from "url";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { LandingPages } from "./collections/LandingPages";
import { Industries } from "./collections/Industries";
import { CaseStudies } from "./collections/CaseStudies";
import { Leads } from "./collections/Leads";
import { AuditPage, IndustriesHub, SiteSettings, SolutionsHub } from "./globals/SiteGlobals";
import { seedContent } from "./lib/seed";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://agiledigitaledge.com";

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: " — Agile Digital Edge",
    },
    components: {
      providers: ["/components/admin/PasswordVisibility#PasswordVisibilityProvider"],
    },
  },
  collections: [Users, Media, LandingPages, Industries, CaseStudies, Leads],
  globals: [SiteSettings, SolutionsHub, IndustriesHub, AuditPage],
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.MONGO_URL || "",
  }),
  sharp,
  onInit: async (payload) => {
    await seedContent(payload);
  },
  plugins: [
    seoPlugin({
      collections: ["landingPages", "industries", "caseStudies"],
      globals: ["solutionsHub", "industriesHub", "auditPage"],
      uploadsCollection: "media",
      generateTitle: ({ doc }) => {
        const title = doc?.title || doc?.heading || doc?.client || "Agile Digital Edge";
        return `${title} | Agile Digital Edge`;
      },
      generateDescription: ({ doc }) =>
        doc?.hero?.subheading || doc?.summary || doc?.intro || doc?.challenge || "",
      generateURL: ({ doc, collectionConfig, globalConfig }) => {
        if (globalConfig?.slug === "solutionsHub") return `${baseUrl}/solutions`;
        if (globalConfig?.slug === "industriesHub") return `${baseUrl}/industries`;
        if (globalConfig?.slug === "auditPage") return `${baseUrl}/free-ecommerce-audit`;
        if (!doc?.slug) return baseUrl;
        if (collectionConfig?.slug === "caseStudies") return `${baseUrl}/case-studies/${doc.slug}`;
        if (collectionConfig?.slug === "industries") return `${baseUrl}/industries/${doc.slug}`;
        return `${baseUrl}/${doc.slug}`;
      },
      fields: ({ defaultFields }) => [
        ...defaultFields,
        { name: "ogTitle", type: "text", label: "OG title" },
        { name: "ogDescription", type: "textarea", label: "OG description" },
        {
          name: "canonical",
          type: "text",
          label: "Canonical URL override",
          admin: { description: "Leave empty to use this page's own URL." },
        },
        {
          name: "breadcrumbTitle",
          type: "text",
          label: "Breadcrumb title",
          admin: { description: "Leave empty to use the page title." },
        },
        {
          name: "robots",
          type: "select",
          label: "Robots",
          defaultValue: "index, follow",
          options: [
            { label: "index, follow", value: "index, follow" },
            { label: "noindex, follow", value: "noindex, follow" },
            { label: "noindex, nofollow", value: "noindex, nofollow" },
          ],
        },
        {
          name: "noindex",
          type: "checkbox",
          label: "Hide from search engines",
          defaultValue: false,
          admin: { description: "Forces noindex, nofollow even if Robots says otherwise." },
        },
      ],
    }),
  ],
});
