import { notFound } from "next/navigation";
import ServicePage from "../../../components/landing/ServicePage";
import { findPublishedBySlug } from "../../../lib/content";
import { metadataFromDoc } from "../../../lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await findPublishedBySlug("landingPages", slug);
  if (!page) return {};
  return metadataFromDoc(page, {
    path: `/${page.slug}`,
    fallbackTitle: `${page.title} | Agile Digital Edge`,
    fallbackDescription: page.hero?.subheading || page.problem?.body || page.title,
  });
}

export default async function LandingRoute({ params }) {
  const { slug } = await params;
  const page = await findPublishedBySlug("landingPages", slug);
  if (!page) notFound();
  return <ServicePage page={page} />;
}
