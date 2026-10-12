import Link from "next/link";
import Breadcrumbs from "../../../components/seo/Breadcrumbs";
import JsonLd from "../../../components/seo/JsonLd";
import { findPublished, readGlobal } from "../../../lib/content";
import { metadataFromDoc } from "../../../lib/seo";
import { breadcrumbSchema } from "../../../lib/schema";

export const revalidate = 60;

const fallback = {
  heading: "Ecommerce solutions",
  intro:
    "Service, migration, and partner pages for Shopify, BigCommerce, and WooCommerce. A page is listed here after it is published from the CMS.",
  supporting:
    "Editors add a landing page, mark it for this hub, and publish it. Incomplete drafts stay off the public site.",
};

export async function generateMetadata() {
  const global = await readGlobal("solutionsHub");
  return metadataFromDoc(global, {
    path: "/solutions",
    fallbackTitle: "Ecommerce Solutions | Agile Digital Edge",
    fallbackDescription: fallback.intro,
  });
}

export default async function SolutionsPage() {
  const [global, pages] = await Promise.all([
    readGlobal("solutionsHub"),
    findPublished("landingPages", { showOnSolutionsHub: { equals: true } }).catch(() => ({ docs: [] })),
  ]);
  const heading = global?.heading || fallback.heading;
  const intro = global?.intro || fallback.intro;
  const supporting = global?.supporting || fallback.supporting;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Solutions", path: "/solutions" },
  ];

  return (
    <article className="bg-black text-white">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <div className="container mx-auto px-6 pt-32 pb-20">
        <Breadcrumbs items={crumbs} />
        <h1 className="max-w-4xl text-4xl font-bold md:text-6xl">{heading}</h1>
        <p className="mt-6 max-w-3xl text-lg text-neutral-300">{intro}</p>
        <p className="mt-4 max-w-3xl text-neutral-400">{supporting}</p>
        {pages.docs?.length ? (
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {pages.docs.map((page) => (
              <li key={page.id}>
                <Link href={`/${page.slug}`} className="block rounded-2xl border border-white/10 p-6 hover:border-white/30">
                  <h2 className="text-2xl font-semibold">{page.title}</h2>
                  {page.hero?.subheading ? <p className="mt-3 text-neutral-400">{page.hero.subheading}</p> : null}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-12 rounded-2xl border border-white/10 p-6 text-neutral-400">
            Published solution pages will appear here. Drafts are not listed.
          </p>
        )}
      </div>
    </article>
  );
}
