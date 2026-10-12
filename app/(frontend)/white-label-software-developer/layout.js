import { buildMetadata } from "../../../lib/seo";

export const metadata = buildMetadata({
  title: 'White Label Software Development | Agile Digital Edge',
  description: 'A white-label engineering partner for agencies that need web, ecommerce, and product delivery under their own brand.',
  path: '/white-label-software-developer',
});

export default function Layout({ children }) {
  return children;
}
