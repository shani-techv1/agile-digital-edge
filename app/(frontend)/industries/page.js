import Link from "next/link";
import Breadcrumbs from "../../../components/seo/Breadcrumbs";
import JsonLd from "../../../components/seo/JsonLd";
import { findPublished, readGlobal } from "../../../lib/content";
import { metadataFromDoc } from "../../../lib/seo";
import { breadcrumbSchema } from "../../../lib/schema";

export const revalidate = 60;

const fallback = {
  heading: "Industries we build for",
  intro:
    "Industry pages describe how we design, migrate, and support ecommerce for a specific market. Publish an Industry document to add one.",
  supporting:
    "Until an industry is published, this page stays a single introduction instead of a list of empty links.",
};

export async function generateMetadata() {
  const global = await readGlobal("industriesHub");
  return metadataFromDoc(global, {
    path: "/industries",
    fallbackTitle: "Ecommerce Industries | Agile Digital Edge",
    fallbackDescription: fallback.intro,
  });
}

export default async function IndustriesPage() {
  const [global, industries] = await Promise.all([
    readGlobal("industriesHub"),
    findPublished("industries").catch(() => ({ docs: [] })),
  ]);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Industries", path: "/industries" },
  ];

  return (
    <article className="bg-black text-white">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <div className="container mx-auto px-6 pt-32 pb-20">
        <Breadcrumbs items={crumbs} />
        <h1 className="max-w-4xl text-4xl font-bold md:text-6xl">{global?.heading || fallback.heading}</h1>
        <p className="mt-6 max-w-3xl text-lg text-neutral-300">{global?.intro || fallback.intro}</p>
        <p className="mt-4 max-w-3xl text-neutral-400">{global?.supporting || fallback.supporting}</p>
        {industries.docs?.length ? (
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {industries.docs.map((industry) => (
              <li key={industry.id}>
                <Link href={`/industries/${industry.slug}`} className="block rounded-2xl border border-white/10 p-6 hover:border-white/30">
                  <h2 className="text-2xl font-semibold">{industry.title}</h2>
                  {industry.summary ? <p className="mt-3 text-neutral-400">{industry.summary}</p> : null}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-12 rounded-2xl border border-white/10 p-6 text-neutral-400">
            Published industry pages will appear here.
          </p>
        )}
      </div>
    </article>
  );
}
