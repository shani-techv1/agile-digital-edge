export default function sitemap() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://agiledigitaledge.com";

    // Base routes
    const routes = ['', '/about', '/contact', '/services', '/success-stories', '/work', '/blogs', '/privacy-policy', '/terms-and-conditions'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
    }));

    // Services routes
    const servicesSlugs = [
        "web-development",
        "ecommerce-development",
        "shopify-app",
        "ui-ux-design",
        "mobile-app-development",
        "seo",
        "social-media-marketing",
        "brand-strategy",
        "content-creation",
        "cloud-solutions"
    ];

    const serviceRoutes = servicesSlugs.map((slug) => ({
        url: `${baseUrl}/services/${slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 0.6,
    }));

    // Success Stories routes
    const successStoryIds = [1, 2, 3, 4, 5];

    const successStoryRoutes = successStoryIds.map((id) => ({
        url: `${baseUrl}/success-stories/${id}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 0.6,
    }));

    return [...routes, ...serviceRoutes, ...successStoryRoutes];
}
