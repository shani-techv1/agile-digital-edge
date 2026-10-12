const target = process.argv[2];

if (!target) {
  console.error("Usage: node scripts/qa-page.mjs <url>");
  process.exit(1);
}

const pageUrl = new URL(target);
const response = await fetch(pageUrl);
const html = await response.text();
const failures = [];

if (response.status !== 200) failures.push(`status ${response.status}, expected 200`);

const title = html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim();
if (!title) failures.push("missing title");

const description = meta(html, "description");
if (!description) failures.push("missing meta description");

const canonical = html.match(/rel="canonical" href="([^"]+)"/i)?.[1];
if (!canonical) failures.push("missing canonical");

const robots = meta(html, "robots");
if (/noindex/i.test(robots)) failures.push(`robots is ${robots}`);

const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
if (h1Count !== 1) failures.push(`expected 1 h1, found ${h1Count}`);

for (const property of ["og:title", "og:description", "og:image"]) {
  if (!meta(html, property)) failures.push(`missing ${property}`);
}

const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map((match) => match[1]);
if (!jsonLd.length) failures.push("missing JSON-LD");
if (!jsonLd.some((block) => block.includes("BreadcrumbList"))) failures.push("missing BreadcrumbList");

const sitemapUrl = new URL("/sitemap.xml", pageUrl.origin);
const sitemap = await fetch(sitemapUrl);
const sitemapXml = await sitemap.text();
if (!sitemapXml.includes(pageUrl.pathname)) {
  failures.push(`sitemap does not list ${pageUrl.pathname}`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`OK ${pageUrl.pathname}`);

function meta(html, name) {
  const byName = new RegExp(`<meta[^>]+(?:name|property)="${name}"[^>]+content="([^"]*)"`, "i");
  const byContent = new RegExp(`<meta[^>]+content="([^"]*)"[^>]+(?:name|property)="${name}"`, "i");
  return html.match(byName)?.[1] || html.match(byContent)?.[1] || "";
}
