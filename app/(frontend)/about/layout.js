import { buildMetadata } from "../../../lib/seo";

export const metadata = buildMetadata({
  title: 'About Agile Digital Edge',
  description: 'Meet the team behind Agile Digital Edge and how the company partners with brands on digital products and ecommerce.',
  path: '/about',
});

export default function Layout({ children }) {
  return children;
}
