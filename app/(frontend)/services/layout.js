import { buildMetadata } from "../../../lib/seo";

export const metadata = buildMetadata({
  title: 'Digital Services | Agile Digital Edge',
  description: 'Web, ecommerce, Shopify app, design, SEO, and cloud services from Agile Digital Edge.',
  path: '/services',
});

export default function Layout({ children }) {
  return children;
}
