import Link from "next/link";

export default function RelatedLinks({ services, caseStudies, industries, resources }) {
  const groups = [
    { title: "Related services", items: links(services, (item) => pageLink(item, `/${item.slug}`)) },
    { title: "Related case studies", items: links(caseStudies, (item) => pageLink(item, `/case-studies/${item.slug}`)) },
    { title: "Related industries", items: links(industries, (item) => pageLink(item, `/industries/${item.slug}`)) },
    {
      title: "Related resources",
      items: (resources || [])
        .filter((item) => item?.label && item?.url)
        .map((item) => ({ key: item.id || item.url, href: item.url, label: item.label })),
    },
  ].filter((group) => group.items.length);

  if (!groups.length) return null;

  return (
    <section className="container mx-auto px-6 py-12">
      {groups.map((group) => (
        <div key={group.title} className="mt-10 first:mt-0">
          <h2 className="text-3xl font-bold">{group.title}</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {group.items.map((item) => (
              <li key={item.key}>
                <Link href={item.href} className="block rounded-2xl border border-white/10 p-5 hover:border-white/30">
                  <h3 className="text-xl font-semibold">{item.label}</h3>
                  {item.detail ? <p className="mt-2 text-neutral-400">{item.detail}</p> : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

function links(value, mapItem) {
  if (!Array.isArray(value)) return [];
  return value.map(mapItem).filter(Boolean);
}

function pageLink(item, href) {
  if (!item || typeof item !== "object" || !item.slug || !item.title) return null;
  return { key: item.id || item.slug, href, label: item.title, detail: item.client || "" };
}
