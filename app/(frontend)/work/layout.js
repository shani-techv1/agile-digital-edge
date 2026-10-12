import { buildMetadata } from "../../../lib/seo";

export const metadata = buildMetadata({
  title: 'Industries and Work | Agile Digital Edge',
  description: 'See the industries and kinds of product work Agile Digital Edge takes on.',
  path: '/work',
});

export default function Layout({ children }) {
  return children;
}
