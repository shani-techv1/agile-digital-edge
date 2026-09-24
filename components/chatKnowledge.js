const contactLinks = [{ label: "Contact us", href: "/contact" }];

const replies = {
  greeting: {
    text: "Hi, I'm Edge — the Agile Digital Edge assistant. I can help with services, packages, and how to start a project. The team replies from the contact page.",
    links: contactLinks,
    suggestions: ["Our services", "Pricing packages", "Contact the team"],
  },
  services: {
    text: "We design and build digital products for growing brands. The main services are web development, ecommerce, Shopify apps, UI/UX, mobile apps, SEO, social media, brand strategy, content, and cloud.",
    links: contactLinks,
    suggestions: ["Web development", "SEO", "Shopify apps"],
  },
  web: {
    text: "Web work covers custom sites and apps in Next.js, React, and Node.js — from marketing sites to scalable product platforms. Website packages start at Web Essential and go up to Web Enterprise.",
    links: contactLinks,
    suggestions: ["Pricing packages", "Ecommerce", "Start a project"],
  },
  ecommerce: {
    text: "We build Shopify stores, custom ecommerce, and Shopify apps — themes, checkout, payments, and private or public App Store apps.",
    links: contactLinks,
    suggestions: ["Web packages", "Contact the team"],
  },
  mobile: {
    text: "Mobile apps are built native and cross-platform with React Native, Flutter, iOS, and Android.",
    links: contactLinks,
    suggestions: ["UI/UX design", "Start a project"],
  },
  design: {
    text: "UI/UX covers research, wireframes, Figma prototypes, and interfaces that convert. Brand strategy covers logo, visual identity, and guidelines.",
    links: contactLinks,
    suggestions: ["Web development", "See our work"],
  },
  seo: {
    text: "SEO packages run from SEO Essential through SEO Enterprise, including keyword research, on-page work, content, and backlinks. Higher tiers add AI search, schema, and more frequent reporting.",
    links: contactLinks,
    suggestions: ["PPC ads", "Social media", "Contact the team"],
  },
  ppc: {
    text: "Paid search campaigns are sold as PPC Essential, Advanced, Professional, and Enterprise — setup, ongoing optimization, and reporting included.",
    links: contactLinks,
    suggestions: ["SEO packages", "Contact the team"],
  },
  social: {
    text: "Social media (SMO) plans are Essential, Advanced, and Enterprise. They cover strategy, creative, posting, and reporting. Higher plans add paid social campaigns.",
    links: contactLinks,
    suggestions: ["SEO packages", "Content creation"],
  },
  content: {
    text: "Content creation includes copywriting, SEO content, and video that turns visitors into customers.",
    links: contactLinks,
    suggestions: ["SEO packages", "Brand strategy"],
  },
  cloud: {
    text: "Cloud work covers AWS, Azure, Google Cloud, and DevOps so the product stays fast and scalable as you grow.",
    links: contactLinks,
    suggestions: ["Web development", "Start a project"],
  },
  whiteLabel: {
    text: "Agencies can white-label our team for web, mobile, Shopify, and AI work. We work under NDA and can appear as your team on client calls.",
    links: contactLinks,
    suggestions: ["Contact the team", "Our services"],
  },
  pricing: {
    text: "Packaged pricing is published for websites, SEO, PPC, and social. Custom product work is quoted after a short call so the scope matches the budget.",
    links: contactLinks,
    suggestions: ["Web development", "Contact the team"],
  },
  contact: {
    text: "Email hello@agiledigitaledge.com, call +1 (561) 327-7682, or send a note on the contact page. Studios:5 Penn Plaza, New York, NY 10001, US.",
    links: contactLinks,
    suggestions: ["Pricing packages", "Our services"],
  },
  about: {
    text: "Agile Digital Edge is a digital agency building websites, products, and growth programs. The team has 5+ years, 150+ projects, and 100+ clients, with a focus on strategy, design, and engineering.",
    links: contactLinks,
    suggestions: ["See our work", "Our services"],
  },
  work: {
    text: "Selected projects live on the Work page, and longer client stories are under Success Stories.",
    links: contactLinks,
    suggestions: ["Start a project", "Our services"],
  },
  process: {
    text: "A typical engagement starts with goals and scope, then design, build, and launch, with a clear point of contact the whole way. Timelines depend on the package or custom scope — the contact form is the fastest way to get one.",
    links: contactLinks,
    suggestions: ["Pricing packages", "Our services"],
  },
  blog: {
    text: "Articles and guides are published on the Agile Digital Edge blog.",
    links: contactLinks,
    suggestions: ["SEO packages", "Our services"],
  },
  fallback: {
    text: "I can answer questions about services, packages, the studio, and how to get in touch. If you need a custom quote, the team replies from the contact page.",
    links: contactLinks,
    suggestions: ["Our services", "Pricing packages", "Contact the team"],
  },
};

const rules = [
  {
    id: "greeting",
    test: (q) =>
      /^(hi|hello|hey|yo|good (morning|afternoon|evening)|howdy|sup)\b/.test(
        q,
      ) || /\bhow are you\b/.test(q),
  },
  {
    id: "contact",
    test: (q) =>
      /\b(contact|email|e-mail|phone|call|whatsapp|address|location|office|visit|noida|reach)\b/.test(
        q,
      ),
  },
  {
    id: "pricing",
    test: (q) =>
      /\b(price|pricing|cost|package|packages|plan|plans|quote|budget|how much|fee)\b/.test(
        q,
      ),
  },
  {
    id: "whiteLabel",
    test: (q) => /\b(white[\s-]?label|partner agency|reseller|nda)\b/.test(q),
  },
  {
    id: "ecommerce",
    test: (q) =>
      /\b(shopify|ecommerce|e-commerce|online store|storefront)\b/.test(q),
  },
  {
    id: "mobile",
    test: (q) =>
      /\b(mobile|ios|android|flutter|react native|app development)\b/.test(q),
  },
  {
    id: "seo",
    test: (q) =>
      /\b(seo|search engine|ranking|organic|google ranking)\b/.test(q),
  },
  {
    id: "ppc",
    test: (q) =>
      /\b(ppc|google ads|paid ads|adwords|advertising|paid search)\b/.test(q),
  },
  {
    id: "social",
    test: (q) =>
      /\b(smo|social media|instagram|facebook|linkedin|twitter)\b/.test(q),
  },
  {
    id: "content",
    test: (q) => /\b(content|copywriting|blog post|video)\b/.test(q),
  },
  {
    id: "cloud",
    test: (q) => /\b(cloud|aws|azure|devops|google cloud)\b/.test(q),
  },
  {
    id: "design",
    test: (q) => /\b(ui|ux|design|figma|brand|logo|branding)\b/.test(q),
  },
  {
    id: "web",
    test: (q) =>
      /\b(website|web site|web dev|web development|next\.?js|react)\b/.test(q),
  },
  {
    id: "work",
    test: (q) =>
      /\b(portfolio|case stud|success stor|our work|projects)\b/.test(q),
  },
  {
    id: "about",
    test: (q) =>
      /\b(about|who are you|your company|your team|what do you do|agile digital)\b/.test(
        q,
      ),
  },
  {
    id: "process",
    test: (q) =>
      /\b(process|timeline|how long|how do you work|get started|start a project|hire)\b/.test(
        q,
      ),
  },
  { id: "blog", test: (q) => /\b(blog|article|resources)\b/.test(q) },
  {
    id: "services",
    test: (q) => /\b(service|services|what can you|offer|help me)\b/.test(q),
  },
];

export const welcomeMessage = {
  id: "welcome",
  role: "bot",
  ...replies.greeting,
};

export function answerQuestion(raw) {
  const q = raw
    .trim()
    .toLowerCase()
    .replace(/[?!.,]/g, "");
  const match = rules.find((rule) => rule.test(q));
  const reply = replies[match?.id || "fallback"];
  return { ...reply, links: contactLinks };
}
