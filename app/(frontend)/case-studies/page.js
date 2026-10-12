import Link from "next/link";
import Breadcrumbs from "../../../components/seo/Breadcrumbs";
import JsonLd from "../../../components/seo/JsonLd";
import { findPublished } from "../../../lib/content";
import { buildMetadata } from "../../../lib/seo";
import { breadcrumbSchema } from "../../../lib/schema";

export const revalidate = 60;

export const metadata = buildMetadata({
  title: "Ecommerce Case Studies | Agile Digital Edge",
  description: "Case studies covering Shopify, migrations, redesigns, payments, and product engineering.",
  path: "/case-studies",
});

export default async function CaseStudiesPage() {
  const result = await findPublished("caseStudies").catch(() => ({ docs: [] }));
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Case studies", path: "/case-studies" },
  ];

  return (
    <article className="bg-black text-white">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <div className="container mx-auto px-6 pt-32 pb-20">
        <Breadcrumbs items={crumbs} />
        <h1 className="max-w-4xl text-4xl font-bold md:text-6xl">Case studies</h1>
        <p className="mt-6 max-w-3xl text-lg text-neutral-300">
          Selected ecommerce and product engagements, including the platform, the problem, and the result.
        </p>
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {result.docs.map((story) => (
            <li key={story.id}>
              <Link href={`/case-studies/${story.slug}`} className="block h-full rounded-2xl border border-white/10 p-6 hover:border-white/30">
                <p className="text-sm text-primary">{story.client}</p>
                <h2 className="mt-2 text-2xl font-semibold">{story.title}</h2>
                {story.challenge ? <p className="mt-3 line-clamp-3 text-neutral-400">{story.challenge}</p> : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
