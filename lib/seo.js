const SITE_NAME = "Agile Digital Edge";

export function getBaseUrl() {
  return (process.env.NEXT_PUBLIC_BASE_URL || "https://agiledigitaledge.com").replace(/\/$/, "");
}

export function absoluteUrl(path = "/") {
  const base = getBaseUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  noindex = false,
  image,
  canonical,
  robots,
  ogTitle,
  ogDescription,
}) {
  const url = canonical || absoluteUrl(path);
  const ogImage = image || absoluteUrl("/logo/agile.png");
  const socialTitle = ogTitle || title;
  const socialDescription = ogDescription || description;

  return {
    metadataBase: new URL(getBaseUrl()),
    title,
    description,
    alternates: { canonical: url },
    robots: robots || (noindex ? { index: false, follow: false } : { index: true, follow: true }),
    openGraph: {
      title: socialTitle,
      description: socialDescription,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [ogImage],
    },
  };
}

export const defaultSiteMetadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: "Agile Digital Edge | Ecommerce Development Partner",
    template: "%s",
  },
  description:
    "Shopify, BigCommerce, and WooCommerce development for brands and agencies. Strategy, migration, custom builds, and ongoing support.",
  icons: {
    icon: "/logo/agile.png",
    shortcut: "/logo/agile.png",
    apple: "/logo/agile.png",
  },
  verification: {
    google: "BzFHuu6Sxw_ouhf4F5HW3mVdb_x50yCQrWZ6IkgNd60",
  },
  alternates: { canonical: getBaseUrl() },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: getBaseUrl(),
    images: [{ url: "/logo/agile.png" }],
  },
};

export function metadataFromDoc(doc, { path, fallbackTitle, fallbackDescription }) {
  const title = doc?.meta?.title || fallbackTitle;
  const description = doc?.meta?.description || fallbackDescription;
  const image = mediaUrl(doc?.meta?.image);
  return buildMetadata({
    title,
    description,
    path,
    robots: robotsFromDoc(doc),
    ogTitle: doc?.meta?.ogTitle || title,
    ogDescription: doc?.meta?.ogDescription || description,
    image: image || undefined,
    canonical: doc?.meta?.canonical || undefined,
  });
}

export function breadcrumbLabel(doc, fallback) {
  return doc?.meta?.breadcrumbTitle || fallback;
}

export function robotsFromDoc(doc) {
  if (doc?.meta?.noindex) return { index: false, follow: false };
  if (doc?.meta?.robots === "noindex, nofollow") return { index: false, follow: false };
  if (doc?.meta?.robots === "noindex, follow") return { index: false, follow: true };
  return { index: true, follow: true };
}

export function mediaUrl(file) {
  if (!file) return null;
  if (typeof file === "string") return file.startsWith("http") || file.startsWith("/") ? file : null;
  if (typeof file.url === "string") return file.url;
  return null;
}
