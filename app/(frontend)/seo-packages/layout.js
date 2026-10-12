import { buildMetadata } from "../../../lib/seo";

export const metadata = buildMetadata({
  title: 'SEO Packages | Agile Digital Edge',
  description: 'Compare SEO packages for technical, on-page, and ongoing search work.',
  path: '/seo-packages',
});

export default function Layout({ children }) {
  return children;
}
