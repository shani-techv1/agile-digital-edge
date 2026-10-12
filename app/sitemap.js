import { getBaseUrl } from "../lib/seo";
import { serviceSlugs } from "../data/services";

export default async function sitemap() {
  const baseUrl = getBaseUrl();
  const staticPaths = [
    "/",
    "/services",
    "/about",
    "/why-agile",
    "/work",
    "/contact",
    "/solutions",
    "/industries",
    "/case-studies",
    "/free-ecommerce-audit",
    "/white-label-software-developer",
    "/web-packages",
    "/seo-packages",
    "/ppc-packages",
    "/smo-packages",
    "/privacy-policy",
    "/terms-and-conditions",
    ...serviceSlugs.filter((slug) => slug !== "branding").map((slug) => `/services/${slug}`),
  ];

  const pages = staticPaths.map((path) => ({
    url: path === "/" ? baseUrl : `${baseUrl}${path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

  try {
    const { findPublished } = await import("../lib/content");
    const [landings, industries, stories] = await Promise.all([
      findPublished("landingPages", { "meta.noindex": { not_equals: true } }, 500),
      findPublished("industries", { "meta.noindex": { not_equals: true } }, 200),
      findPublished("caseStudies", { "meta.noindex": { not_equals: true } }, 200),
    ]);

    for (const doc of landings.docs) {
      pages.push(entry(baseUrl, `/${doc.slug}`, doc.updatedAt));
    }
    for (const doc of industries.docs) {
      pages.push(entry(baseUrl, `/industries/${doc.slug}`, doc.updatedAt));
    }
    for (const doc of stories.docs) {
      pages.push(entry(baseUrl, `/case-studies/${doc.slug}`, doc.updatedAt));
    }
  } catch (error) {
    console.error("Sitemap CMS lookup failed", error);
  }

  return pages;
}

function entry(baseUrl, path, updatedAt) {
  return {
    url: `${baseUrl}${path}`,
    lastModified: updatedAt ? new Date(updatedAt) : undefined,
    changeFrequency: "monthly",
    priority: 0.7,
  };
}
