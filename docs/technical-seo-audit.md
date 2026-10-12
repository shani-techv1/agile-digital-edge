# Technical SEO audit — Agile Digital Edge

Audit date: 12 October 2026. Production host checked: `https://agiledigitaledge.com` (Hostinger). Code status is the state of this repository after the ecommerce lead-generation sprint.

PageSpeed Insights returned HTTP 429 for `/`, `/contact`, and `/services/web-development`, so lab Core Web Vitals were not collected. Homepage weight is recorded from the source instead.

| URL | Issue | Severity | Recommendation | Status |
| --- | --- | --- | --- | --- |
| All indexable URLs except `/why-agile`, `/privacy-policy`, `/terms-and-conditions` | Production HTML used one title (`AgileDigitalEdge \| Modern Digital Agency`) and one description. No canonical, Open Graph, Twitter card, or meta robots. | High | Unique title, description, self-canonical, and social tags on every indexable URL. | Fixed |
| `/`, `/contact`, `/services/web-development`, `/blogs` | No `application/ld+json` in the live HTML. | High | Add Organization, WebSite, BreadcrumbList, Service, and FAQPage where the page has those facts. | Fixed |
| `/services/not-a-real-service` | Unknown service slug returned HTTP 200 with a “not found” heading. | High | Return a real 404 with `notFound()`. | Fixed |
| `/success-stories/99` | Unknown story id returned HTTP 200. | High | Retire numeric story URLs. 301 the five real stories to `/case-studies/[slug]` and 404 anything else. | Fixed |
| `/blogs` | Placeholder index was in the sitemap while the header already pointed at `https://blog.agiledigitaledge.com`. “Read more” linked back to `/blogs`. | High | 301 `/blogs` and `/blogs/:path*` to the blog host and remove the placeholder from the sitemap. | Fixed |
| `https://www.agiledigitaledge.com/` | Apex and www both returned HTTP 200 with the same HTML and no canonical, so the host was duplicated. | High | 301 www to `https://agiledigitaledge.com`. | Fixed in `next.config.mjs` (applies on the next deploy) |
| `http://agiledigitaledge.com/` | Already 301s to HTTPS at the host. | Low | Keep the host redirect. Canonicals in metadata are always the HTTPS apex. | Already correct on production |
| `/about/` | Trailing slash already 308s to `/about`. | Low | Keep Next’s no-trailing-slash canonical. `/shopify-development/` will 308 to `/shopify-development`. | Already correct |
| `/this-page-does-not-exist` | Already HTTP 404. | Low | Keep a branded `not-found` page. | Fixed |
| `/sitemap.xml` | 30 URLs. `lastModified` changed on every build. `/blogs` and `/success-stories/1`–`5` were included. `/services/product-engineering` and `/services/branding` were missing even though the pages existed. | Medium | List only real, indexable URLs. Use document `updatedAt` for CMS URLs. Add product engineering. Do not list redirected, admin, or thank-you URLs. | Fixed |
| `/robots.txt` | Allowed `/`, disallowed `/api/`, and pointed at the sitemap. | Low | Also disallow `/admin` once the CMS exists. | Fixed |
| `/services/branding` and `/services/brand-strategy` | Overlapping service intent. Branding was linked in the footer and omitted from the sitemap. | Medium | 301 branding to brand strategy and point internal links at the destination. | Fixed |
| Case study, blog, and testimonial images | Raw `<img>` tags and remote URLs, with no `sizes` on filled `next/image` shots. | Medium | Use `next/image` with dimensions or `sizes`. Allow Unsplash and portrait hosts in `images.remotePatterns`. | Fixed |
| Nested service, solution, industry, and case-study URLs | No visible breadcrumbs and no BreadcrumbList. Service sections skipped from `h1` to `h3`. | Medium | One `h1` per template. Section titles as `h2`. Breadcrumbs in the page and in JSON-LD. | Fixed |
| `/` | Spline, GSAP, and Framer Motion load on the homepage. Lab CWV was not measured because PageSpeed returned 429. | Medium | Record the weight. Do not rebuild the homepage WebGL in this sprint. Re-test Lighthouse after deploy. | Open |
| Production HTML | Console errors were not captured on the live host. Local review of the new landing page, case study, hubs, audit form, and admin screen did not show a broken page. | Low | Re-test the homepage console after deploy. The homepage still loads Spline and GSAP. | Open |
| Contact and white-label email APIs | Visitor text was inserted into HTML without escaping. The two forms used different SMTP variable names. | Medium | Escape HTML and read `SMTP_*`, falling back to `EMAIL_*`. | Fixed |
| CMS uploads on the current host | Payload stores media on local disk. A host without a persistent disk will drop uploads on restart. | Medium | Use persistent disk or object storage before editors rely on uploads. Seeded case-study images use remote URLs so they do not depend on local files. | Open |
| Intended ecommerce URLs (`/shopify-development` and the rest of the target list) | These paths did not exist. Creating empty pages would have added thin URLs. | High | Serve a URL only when a complete document is published. `/shopify-development` is seeded as a draft and returns 404 until an editor publishes it. | Fixed |

## URL architecture

These slugs are the content model, not live pages. A document has to be published, with a hero heading, a problem, a solution, and at least one service or FAQ, before it is routable or added to the sitemap.

- Services: `shopify-development`, `shopify-plus-development`, `shopify-website-redesign`, `shopify-speed-optimization`, `shopify-custom-development`, `shopify-app-development`, `shopify-maintenance-support`, `bigcommerce-development`, `woocommerce-development`
- Migrations: `shopify-migration`, `bigcommerce-migration`, `woocommerce-migration`
- Location: `shopify-development-australia`
- Agency and white label: `white-label-development`, `white-label-shopify-development`, `white-label-wordpress-development`, `agency-development-partner`, `hire-dedicated-developers`
- Hubs: `/solutions`, `/industries`, `/industries/[slug]`, `/case-studies`, `/case-studies/[slug]`, `/work`
- Lead form: `/free-ecommerce-audit` (thank-you page is `noindex` and omitted from the sitemap)

`/services/shopify-app` is not redirected to `/shopify-app-development` until that new page is published with real copy.
