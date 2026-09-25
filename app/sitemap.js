const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://agiledigitaledge.com";

const serviceSlugs = [
    "web-development",
    "ecommerce-development",
    "shopify-app",
    "ui-ux-design",
    "mobile-app-development",
    "seo",
    "social-media-marketing",
    "brand-strategy",
    "content-creation",
    "cloud-solutions",
];

const successStoryIds = [1, 2, 3, 4, 5];

function entry(path, { changeFrequency, priority }) {
    return {
        url: path ? `${baseUrl}${path}` : baseUrl,
        lastModified: new Date(),
        changeFrequency,
        priority,
    };
}

export default function sitemap() {
    const pages = [
        entry("", { changeFrequency: "weekly", priority: 1 }),
        entry("/services", { changeFrequency: "weekly", priority: 0.9 }),
        entry("/about", { changeFrequency: "monthly", priority: 0.8 }),
        entry("/work", { changeFrequency: "weekly", priority: 0.8 }),
        entry("/contact", { changeFrequency: "monthly", priority: 0.8 }),
        entry("/success-stories", { changeFrequency: "weekly", priority: 0.8 }),
        entry("/blogs", { changeFrequency: "weekly", priority: 0.7 }),
        entry("/white-label-software-developer", { changeFrequency: "monthly", priority: 0.8 }),
        entry("/web-packages", { changeFrequency: "monthly", priority: 0.8 }),
        entry("/seo-packages", { changeFrequency: "monthly", priority: 0.8 }),
        entry("/ppc-packages", { changeFrequency: "monthly", priority: 0.8 }),
        entry("/smo-packages", { changeFrequency: "monthly", priority: 0.8 }),
        entry("/privacy-policy", { changeFrequency: "yearly", priority: 0.3 }),
        entry("/terms-and-conditions", { changeFrequency: "yearly", priority: 0.3 }),
        ...serviceSlugs.map((slug) =>
            entry(`/services/${slug}`, { changeFrequency: "monthly", priority: 0.7 })
        ),
        ...successStoryIds.map((id) =>
            entry(`/success-stories/${id}`, { changeFrequency: "monthly", priority: 0.6 })
        ),
    ];

    return pages;
}
