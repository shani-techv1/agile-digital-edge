import { organizationFallback } from "./schema";

const stories = [
  {
    title: "Automating Inventory for Scale",
    slug: "luxe-apparel",
    legacyId: "1",
    client: "Luxe Apparel",
    industry: "Fashion",
    platform: "Shopify",
    services: ["Shopify App", "Automation"],
    challenge:
      "Luxe Apparel was struggling with overselling issues due to inventory discrepancies between their 5 warehouses and online store. Manual updates were prone to errors and took valuable time.",
    existingPlatform: "Shopify",
    requirements:
      "Synchronize inventory across five warehouses and the online store without manual updates, and stop overselling.",
    solution:
      "We developed a bespoke private Shopify App using Node.js and React. The app hooks into Shopify's inventory webhooks and synchronizes stock levels across all locations in near real-time (under 2 seconds).",
    features: [
      { title: "Realtime inventory sync", description: "Stock levels update across locations in under two seconds." },
      { title: "Warehouse coverage", description: "Five warehouses stay aligned with the Shopify storefront." },
    ],
    integrations: [{ name: "Shopify" }, { name: "Redis" }],
    results: [
      { label: "Hours Saved/Week", value: "20+" },
      { label: "Sync Speed", value: "< 2s" },
      { label: "Overselling Incidents", value: "0" },
    ],
    screenshots: [
      {
        imageUrl:
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop",
        alt: "Retail store interior representing Luxe Apparel",
      },
    ],
    technology: ["Shopify App", "Node.js", "React", "Redis"],
  },
  {
    title: "Legacy to Next.js Migration",
    slug: "techstream",
    legacyId: "2",
    client: "TechStream",
    industry: "Technology",
    platform: "Next.js",
    services: ["Migration", "SEO"],
    challenge:
      "The client's existing PHP application was slow, difficult to maintain, and suffering in search rankings due to poor core web vitals.",
    existingPlatform: "PHP",
    requirements: "Replace the legacy PHP frontend with a faster architecture the marketing team can update.",
    solution:
      "We re-architected the frontend using Next.js for server-side rendering and static generation, and implemented a headless CMS so the marketing team can update content.",
    features: [
      { title: "Server rendering", description: "Pages render on the server for faster first loads and clearer HTML." },
      { title: "Headless content", description: "Marketing can publish updates without a developer release." },
    ],
    integrations: [{ name: "Headless CMS" }],
    results: [
      { label: "Performance", value: "3x Faster" },
      { label: "Traffic Increase", value: "+150%" },
      { label: "SEO Score", value: "100" },
    ],
    screenshots: [
      {
        imageUrl:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
        alt: "Analytics dashboard representing the TechStream migration",
      },
    ],
    technology: ["Next.js", "Tailwind CSS", "SEO"],
  },
  {
    title: "E-commerce Redesign and CRO",
    slug: "glow-beauty",
    legacyId: "3",
    client: "Glow Beauty",
    industry: "Beauty",
    platform: "Shopify Plus",
    services: ["UI/UX", "CRO"],
    challenge:
      "High cart abandonment rates on mobile devices were costing the business significant revenue. The user interface was cluttered and navigation was confusing.",
    existingPlatform: "Shopify Plus",
    requirements: "Redesign the store around mobile shoppers and simplify checkout.",
    solution:
      "We designed a mobile-first experience focused on speed and simplicity, streamlined checkout, and applied a visual identity that matches the audience.",
    features: [
      { title: "Mobile-first layout", description: "Navigation and product pages are built for small screens first." },
      { title: "Shorter checkout", description: "Fewer steps between cart and payment." },
    ],
    integrations: [{ name: "Shopify Plus" }],
    results: [
      { label: "Conversion Rate", value: "+40%" },
      { label: "Mobile Sales", value: "+65%" },
      { label: "Cart Abandonment", value: "-25%" },
    ],
    screenshots: [
      {
        imageUrl:
          "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=1600&auto=format&fit=crop",
        alt: "Beauty products representing the Glow Beauty redesign",
      },
    ],
    technology: ["Shopify Plus", "Figma", "CRO"],
  },
  {
    title: "Custom Payment Gateway",
    slug: "payflow",
    legacyId: "4",
    client: "PayFlow",
    industry: "Fintech",
    platform: "Custom",
    services: ["Payments", "Security"],
    challenge:
      "The client needed to accept a specific set of cryptocurrencies and local payment methods that were not supported by standard gateways.",
    existingPlatform: "Custom checkout",
    requirements: "Accept cryptocurrency and local payment methods with PCI-conscious handling and fraud checks.",
    solution:
      "We built a custom gateway integration that connects to multiple payment processors, with PCI-conscious handling and fraud detection.",
    features: [
      { title: "Multiple processors", description: "One checkout can route crypto and local payment methods." },
      { title: "Fraud checks", description: "Transactions are screened before they are accepted." },
    ],
    integrations: [{ name: "Payment processors" }],
    results: [
      { label: "Transaction Success", value: "99.9%" },
      { label: "Currencies", value: "50+" },
      { label: "Fraud Rate", value: "< 0.1%" },
    ],
    screenshots: [
      {
        imageUrl:
          "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1600&auto=format&fit=crop",
        alt: "Card payment representing the PayFlow gateway",
      },
    ],
    technology: ["Node.js", "API", "Security"],
  },
  {
    title: "High-Traffic Dashboard",
    slug: "datadash",
    legacyId: "5",
    client: "DataDash",
    industry: "SaaS",
    platform: "React",
    services: ["Product engineering", "Data visualization"],
    challenge:
      "Rendering large datasets in the browser was causing the application to freeze, leading to a poor user experience for enterprise clients.",
    existingPlatform: "React dashboard",
    requirements: "Visualize large datasets without freezing the browser.",
    solution:
      "We used Web Workers for data processing and virtualization so only visible points render, with D3.js for the charts.",
    features: [
      { title: "Virtualized rendering", description: "Only the rows and points on screen are drawn." },
      { title: "Background processing", description: "Heavy calculations run off the main thread." },
    ],
    integrations: [{ name: "D3.js" }],
    results: [
      { label: "Data Points", value: "1M+" },
      { label: "Load Time", value: "0.5s" },
      { label: "User Satisfaction", value: "4.9/5" },
    ],
    screenshots: [
      {
        imageUrl:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
        alt: "Data charts representing the DataDash dashboard",
      },
    ],
    technology: ["React", "D3.js", "Web Workers"],
  },
];

export async function seedContent(payload) {
  await seedSettings(payload);
  await seedHubs(payload);
  await seedCaseStudies(payload);
  await seedDraftLanding(payload);
}

async function seedSettings(payload) {
  const current = await payload.findGlobal({ slug: "siteSettings" });
  if (current?.organizationName) return;
  await payload.updateGlobal({
    slug: "siteSettings",
    data: {
      organizationName: organizationFallback.organizationName,
      siteUrl: organizationFallback.siteUrl,
      email: organizationFallback.email,
      telephone: organizationFallback.telephone,
      streetAddress: organizationFallback.streetAddress,
      addressLocality: organizationFallback.addressLocality,
      addressRegion: organizationFallback.addressRegion,
      postalCode: organizationFallback.postalCode,
      addressCountry: organizationFallback.addressCountry,
      sameAs: organizationFallback.sameAs.map((url) => ({ url })),
    },
  });
}

async function seedHubs(payload) {
  const solutions = await payload.findGlobal({ slug: "solutionsHub" });
  if (!solutions?.heading) {
    await payload.updateGlobal({
      slug: "solutionsHub",
      data: {
        heading: "Ecommerce solutions",
        intro:
          "Service, migration, and partner pages for Shopify, BigCommerce, and WooCommerce. Each page is published from the CMS when the copy is complete, so empty URLs are never added to the site.",
        supporting:
          "Use this hub to compare build, migration, redesign, speed, app, and white-label engagements. New pages appear here when an editor marks them for the solutions hub and publishes them.",
      },
    });
  }

  const industries = await payload.findGlobal({ slug: "industriesHub" });
  if (!industries?.heading) {
    await payload.updateGlobal({
      slug: "industriesHub",
      data: {
        heading: "Industries we build for",
        intro:
          "Industry pages explain how Agile Digital Edge designs, migrates, and supports ecommerce for a specific market. A page is added by publishing an Industry document, not by shipping new code.",
        supporting:
          "Each industry page can link to related services and case studies. Until those documents are published, this hub stays a single, complete introduction rather than a list of empty links.",
      },
    });
  }

  const audit = await payload.findGlobal({ slug: "auditPage" });
  if (!audit?.heading) {
    await payload.updateGlobal({
      slug: "auditPage",
      data: {
        heading: "Free ecommerce audit",
        intro:
          "Tell us about the store, the platform, and what needs to change. We review the request and reply with a practical next step for Shopify, BigCommerce, WooCommerce, or a migration.",
        submitLabel: "Request the audit",
      },
    });
  }
}

async function seedCaseStudies(payload) {
  const existing = await payload.find({ collection: "caseStudies", limit: 1, depth: 0 });
  if (existing.totalDocs > 0) return;

  const created = [];
  for (const story of stories) {
    const { legacyId, ...data } = story;
    const doc = await payload.create({
      collection: "caseStudies",
      data: {
        ...data,
        cta: {
          heading: `Start a project like ${story.client}`,
          body: "Share the platform, the current store, and the outcome you need.",
          buttonLabel: "Request a free audit",
          buttonHref: "/free-ecommerce-audit",
        },
        _status: "published",
      },
    });
    created.push({ ...doc, legacyId });
  }

  for (const doc of created) {
    await payload.update({
      collection: "caseStudies",
      id: doc.id,
      data: {
        related: created.filter((item) => item.id !== doc.id).slice(0, 2).map((item) => item.id),
        _status: "published",
      },
    });
  }
}

async function seedDraftLanding(payload) {
  const existing = await payload.find({
    collection: "landingPages",
    where: { slug: { equals: "shopify-development" } },
    limit: 1,
    depth: 0,
    draft: true,
  });
  if (existing.totalDocs > 0) return;

  await payload.create({
    collection: "landingPages",
    draft: true,
    data: {
      title: "Shopify Development",
      slug: "shopify-development",
      pageType: "service",
      platform: "shopify",
      showOnSolutionsHub: true,
      _status: "draft",
      hero: {
        eyebrow: "Shopify",
        heading: "Shopify development for brands that need more than a theme",
        subheading:
          "Custom storefronts, apps, and integrations for teams that have outgrown a template.",
        primaryCtaLabel: "Request a free audit",
        primaryCtaHref: "/free-ecommerce-audit",
        secondaryCtaLabel: "See the work",
        secondaryCtaHref: "/case-studies",
      },
      problem: {
        heading: "The store cannot support the next stage of growth",
        body: "Checkout, apps, and content changes start to conflict. Speed drops, and every new feature needs a developer who understands the whole stack.",
        points: [
          { title: "Theme limits", description: "Merchandising ideas do not fit the current theme." },
          { title: "App sprawl", description: "Overlapping apps slow the storefront and complicate checkout." },
        ],
      },
      solution: {
        heading: "A Shopify build shaped around the business",
        body: "We design the storefront, the integrations, and the operating workflow together, then leave the team with a system they can run.",
        points: [
          { title: "Custom storefront", description: "Sections and templates match how the catalog is actually sold." },
          { title: "Integration plan", description: "ERP, subscriptions, and reviews connect without stacking redundant apps." },
        ],
      },
      services: {
        heading: "What a Shopify engagement can include",
        items: [
          { title: "Storefront development", description: "Online Store 2.0 themes or a headless storefront." },
          { title: "App development", description: "Private apps and checkout extensions for the workflows the theme cannot cover." },
          { title: "Launch support", description: "QA, redirects, and a handover the internal team can use." },
        ],
      },
      technologies: [{ name: "Shopify" }, { name: "Liquid" }, { name: "Hydrogen" }, { name: "React" }],
      integrations: [{ name: "Klaviyo" }, { name: "Recharge" }, { name: "ERP" }],
      process: {
        heading: "How an engagement runs",
        steps: [
          { title: "Audit", description: "Review the current store, apps, and the result the business needs." },
          { title: "Build", description: "Design and implement the storefront, apps, and integrations." },
          { title: "Launch", description: "Test, redirect, and hand over documentation." },
        ],
      },
      faqs: [
        {
          question: "Can this page be published later without a code change?",
          answer: "Yes. Publishing this document creates /shopify-development. It stays unpublished until an editor publishes it.",
        },
      ],
      cta: {
        heading: "Plan the Shopify build",
        body: "Send the current store URL and what needs to change.",
        buttonLabel: "Request a free audit",
        buttonHref: "/free-ecommerce-audit",
      },
    },
  });
}

export { stories };
