import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "randomuser.me" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.agiledigitaledge.com" }],
        destination: "https://agiledigitaledge.com/:path*",
        statusCode: 301,
      },
      {
        source: "/blogs",
        destination: "https://blog.agiledigitaledge.com",
        statusCode: 301,
      },
      {
        source: "/blogs/:path*",
        destination: "https://blog.agiledigitaledge.com/:path*",
        statusCode: 301,
      },
      {
        source: "/services/branding",
        destination: "/services/brand-strategy",
        statusCode: 301,
      },
      {
        source: "/success-stories",
        destination: "/case-studies",
        statusCode: 301,
      },
      {
        source: "/success-stories/1",
        destination: "/case-studies/luxe-apparel",
        statusCode: 301,
      },
      {
        source: "/success-stories/2",
        destination: "/case-studies/techstream",
        statusCode: 301,
      },
      {
        source: "/success-stories/3",
        destination: "/case-studies/glow-beauty",
        statusCode: 301,
      },
      {
        source: "/success-stories/4",
        destination: "/case-studies/payflow",
        statusCode: 301,
      },
      {
        source: "/success-stories/5",
        destination: "/case-studies/datadash",
        statusCode: 301,
      },
    ];
  },
};

export default withPayload(nextConfig);
