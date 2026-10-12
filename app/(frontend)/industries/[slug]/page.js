import { notFound } from "next/navigation";
import Breadcrumbs from "../../../../components/seo/Breadcrumbs";
import JsonLd from "../../../../components/seo/JsonLd";
import RelatedLinks from "../../../../components/seo/RelatedLinks";
import { findPublishedBySlug } from "../../../../lib/content";
import { mediaUrl, metadataFromDoc } from "../../../../lib/seo";
import { breadcrumbSchema } from "../../../../lib/schema";
import Image from "next/image";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const industry = await findPublishedBySlug("industries", slug);
  if (!industry) return {};
  return metadataFromDoc(industry, {
    path: `/industries/${industry.slug}`,
    fallbackTitle: `${industry.title} Ecommerce | Agile Digital Edge`,
    fallbackDescription: industry.summary || industry.hero?.subheading || industry.title,
  });
}

export default async function IndustryPage({ params }) {
  const { slug } = await params;
  const industry = await findPublishedBySlug("industries", slug);
  if (!industry) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Industries", path: "/industries" },
    { name: industry.meta?.breadcrumbTitle || industry.title, path: `/industries/${industry.slug}` },
  ];
  const image = mediaUrl(industry.hero?.image);
  const services = Array.isArray(industry.relatedServices) ? industry.relatedServices.filter((item) => item?.slug) : [];
  const stories = Array.isArray(industry.relatedCaseStudies) ? industry.relatedCaseStudies.filter((item) => item?.slug) : [];

  return (
    <article className="bg-black text-white">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <div className="container mx-auto px-6 pt-32 pb-20">
        <Breadcrumbs items={crumbs} />
        <h1 className="max-w-4xl text-4xl font-bold md:text-6xl">{industry.hero?.heading || industry.title}</h1>
        {industry.hero?.subheading || industry.summary ? (
          <p className="mt-6 max-w-3xl text-lg text-neutral-300">{industry.hero?.subheading || industry.summary}</p>
        ) : null}
        {image ? (
          <div className="relative mt-10 aspect-[16/8] overflow-hidden rounded-3xl">
            <Image src={image} alt={industry.title} fill sizes="(min-width: 1024px) 1100px, 100vw" className="object-cover" />
          </div>
        ) : null}
        {industry.body ? <p className="mt-10 max-w-3xl text-lg leading-relaxed text-neutral-300">{industry.body}</p> : null}
        <RelatedLinks services={services} caseStudies={stories} />
      </div>
    </article>
  );
}
