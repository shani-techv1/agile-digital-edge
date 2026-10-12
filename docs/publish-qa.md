# Publish QA

Run this before a CMS page is treated as ready to publish. The landing-page publish guard already blocks a publish that is missing the hero heading, problem, solution, a service or FAQ, SEO title, or meta description.

Payload media stays on local disk. Production still needs persistent disk or object storage before editors rely on uploads.

## Automated check

```bash
node scripts/qa-page.mjs http://127.0.0.1:3000/case-studies/luxe-apparel
```

The script checks HTTP 200, one `h1`, title, meta description, canonical, Open Graph title, description, and image, breadcrumb JSON-LD, at least one JSON-LD block, that the page is not `noindex`, and that the sitemap lists the path.

## Manual checklist

- [ ] 200 response
- [ ] Indexable (`index, follow`, and the noindex checkbox is off)
- [ ] Correct canonical (`https://agiledigitaledge.com` plus the path)
- [ ] One H1
- [ ] SEO title
- [ ] Meta description
- [ ] OG title, description, and image
- [ ] Breadcrumb on the page and in JSON-LD
- [ ] Schema (Organization and WebSite on the layout; Service or FAQ when the page has them)
- [ ] URL is in `/sitemap.xml`
- [ ] Internal links (related services, case studies, industries, or resources) when those relations exist
- [ ] Mobile layout
- [ ] Images use `next/image` (AVIF/WebP, width and height or `sizes`)
- [ ] No console errors
- [ ] No broken links
- [ ] `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set in production so events fire
- [ ] A test submit records `audit_request` or `contact_submission`, and phone, email, and WhatsApp clicks record when those links exist
- [ ] Submit `https://agiledigitaledge.com/sitemap.xml` in Google Search Console after deploy
