import { buildMetadata } from "../../../lib/seo";

export const metadata = buildMetadata({
  title: 'Contact Agile Digital Edge',
  description: 'Talk to Agile Digital Edge about a Shopify, BigCommerce, WooCommerce, or custom product engagement.',
  path: '/contact',
});

export default function Layout({ children }) {
  return children;
}
