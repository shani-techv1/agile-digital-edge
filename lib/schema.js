import { absoluteUrl } from "./seo";

export const organizationFallback = {
  organizationName: "Agile Digital Edge",
  siteUrl: absoluteUrl("/"),
  email: "hello@agiledigitaledge.com",
  telephone: "+1-561-327-7682",
  streetAddress: "5 Penn Plaza",
  addressLocality: "New York",
  addressRegion: "NY",
  postalCode: "10001",
  addressCountry: "US",
  sameAs: ["https://www.linkedin.com/company/agile-digital-edge/"],
};

export function organizationSchema(settings = {}) {
  const data = { ...organizationFallback, ...stripEmpty(settings) };
  const sameAs = Array.isArray(data.sameAs)
    ? data.sameAs.map((item) => (typeof item === "string" ? item : item?.url)).filter(Boolean)
    : organizationFallback.sameAs;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: data.organizationName,
    url: data.siteUrl || absoluteUrl("/"),
    email: data.email,
    telephone: data.telephone,
    logo: absoluteUrl("/logo/agile.png"),
    sameAs,
    address: {
      "@type": "PostalAddress",
      streetAddress: data.streetAddress,
      addressLocality: data.addressLocality,
      addressRegion: data.addressRegion,
      postalCode: data.postalCode,
      addressCountry: data.addressCountry,
    },
  };
}

export function websiteSchema(settings = {}) {
  const name = settings.organizationName || organizationFallback.organizationName;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url: settings.siteUrl || absoluteUrl("/"),
    publisher: {
      "@type": "Organization",
      name,
    },
  };
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema({ name, description, path, areaServed }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    provider: {
      "@type": "Organization",
      name: organizationFallback.organizationName,
      url: absoluteUrl("/"),
    },
  };
  if (areaServed) schema.areaServed = areaServed;
  return schema;
}

export function faqSchema(faqs = []) {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function stripEmpty(settings) {
  return Object.fromEntries(
    Object.entries(settings).filter(([, value]) => value !== undefined && value !== null && value !== ""),
  );
}
