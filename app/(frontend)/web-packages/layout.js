import { buildMetadata } from "../../../lib/seo";

export const metadata = buildMetadata({
  title: 'Web Design Packages | Agile Digital Edge',
  description: 'Compare web design packages and start a project with Agile Digital Edge.',
  path: '/web-packages',
});

export default function Layout({ children }) {
  return children;
}
