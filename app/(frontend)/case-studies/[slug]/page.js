import { notFound } from "next/navigation";
import CaseStudyPage from "../../../../components/case-studies/CaseStudyPage";
import { findPublished, findPublishedBySlug } from "../../../../lib/content";
import { metadataFromDoc } from "../../../../lib/seo";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const result = await findPublished("caseStudies", null, 100);
    return result.docs.map((doc) => ({ slug: doc.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const story = await findPublishedBySlug("caseStudies", slug);
  if (!story) return {};
  return metadataFromDoc(story, {
    path: `/case-studies/${story.slug}`,
    fallbackTitle: `${story.title} | ${story.client} | Agile Digital Edge`,
    fallbackDescription: story.challenge || story.solution || story.title,
  });
}

export default async function CaseStudyRoute({ params }) {
  const { slug } = await params;
  const story = await findPublishedBySlug("caseStudies", slug);
  if (!story) notFound();
  return <CaseStudyPage story={story} />;
}
