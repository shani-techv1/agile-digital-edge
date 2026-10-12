import { getBaseUrl } from "../lib/seo";

export default function robots() {
  const baseUrl = getBaseUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
