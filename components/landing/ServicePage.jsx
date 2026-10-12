import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "../seo/Breadcrumbs";
import JsonLd from "../seo/JsonLd";
import { mediaUrl } from "../../lib/seo";
import { breadcrumbSchema, faqSchema, serviceSchema } from "../../lib/schema";

export default function ServicePage({ page }) {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Solutions", path: "/solutions" },
    { name: page.title, path: `/${page.slug}` },
  ];
  const faqs = page.faqs || [];
  const areaServed = page.pageType === "location" ? page.location?.country : undefined;
  const heroImage = mediaUrl(page.hero?.image);

  return (
    <article className="bg-black text-white">
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          serviceSchema({
            name: page.title,
            description: page.hero?.subheading || page.problem?.body || page.title,
            path: `/${page.slug}`,
            areaServed,
          }),
          faqSchema(faqs),
        ]}
      />
      <header className="container mx-auto px-6 pt-32 pb-16">
        <Breadcrumbs items={crumbs} />
        {page.hero?.eyebrow ? (
          <p className="mb-4 text-sm font-medium uppercase tracking-wide text-primary">{page.hero.eyebrow}</p>
        ) : null}
        <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">{page.hero?.heading || page.title}</h1>
        {page.hero?.subheading ? (
          <p className="mt-6 max-w-2xl text-lg text-neutral-300">{page.hero.subheading}</p>
        ) : null}
        <div className="mt-8 flex flex-wrap gap-4">
          {page.hero?.primaryCtaLabel ? (
            <Link href={page.hero.primaryCtaHref || "/free-ecommerce-audit"} className="rounded-full bg-white px-6 py-3 font-semibold text-black">
              {page.hero.primaryCtaLabel}
            </Link>
          ) : null}
          {page.hero?.secondaryCtaLabel ? (
            <Link href={page.hero.secondaryCtaHref || "/contact"} className="rounded-full border border-white/20 px-6 py-3 font-semibold">
              {page.hero.secondaryCtaLabel}
            </Link>
          ) : null}
        </div>
        {heroImage ? (
          <div className="relative mt-12 aspect-[16/8] overflow-hidden rounded-3xl">
            <Image src={heroImage} alt={page.hero?.heading || page.title} fill sizes="(min-width: 1024px) 1100px, 100vw" className="object-cover" />
          </div>
        ) : null}
      </header>

      <LogoRow logos={page.logos} />
      <CopySection heading={page.problem?.heading} body={page.problem?.body} items={page.problem?.points} />
      <CopySection heading={page.solution?.heading} body={page.solution?.body} items={page.solution?.points} />
      <CopySection heading={page.services?.heading || "Services"} items={page.services?.items} />
      <NameRow heading="Technologies" items={page.technologies} />
      <NameRow heading="Integrations" items={page.integrations} />
      <CopySection heading={page.process?.heading || "Process"} items={page.process?.steps} ordered />
      <CaseStudyRow studies={page.caseStudies} />
      <TestimonialRow testimonials={page.testimonials} />
      <FaqList faqs={faqs} />
      <CtaBlock cta={page.cta} />
    </article>
  );
}

function LogoRow({ logos = [] }) {
  if (!logos.length) return null;
  return (
    <section className="border-y border-white/10 py-10">
      <div className="container mx-auto flex flex-wrap items-center gap-8 px-6">
        {logos.map((logo) => {
          const src = mediaUrl(logo.image);
          return src ? (
            <Image key={logo.id || logo.name} src={src} alt={logo.name} width={120} height={48} className="h-10 w-auto object-contain" />
          ) : (
            <span key={logo.id || logo.name} className="text-sm font-medium text-neutral-400">
              {logo.name}
            </span>
          );
        })}
      </div>
    </section>
  );
}

function CopySection({ heading, body, items = [], ordered = false }) {
  if (!heading && !body && !items.length) return null;
  const List = ordered ? "ol" : "ul";
  return (
    <section className="container mx-auto px-6 py-16">
      {heading ? <h2 className="text-3xl font-bold md:text-4xl">{heading}</h2> : null}
      {body ? <p className="mt-4 max-w-3xl text-lg text-neutral-300">{body}</p> : null}
      {items.length ? (
        <List className="mt-8 grid gap-6 md:grid-cols-2">
          {items.map((item, index) => (
            <li key={item.id || item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-semibold">
                {ordered ? `${index + 1}. ` : ""}
                {item.title}
              </h3>
              {item.description ? <p className="mt-3 text-neutral-400">{item.description}</p> : null}
            </li>
          ))}
        </List>
      ) : null}
    </section>
  );
}

function NameRow({ heading, items = [] }) {
  if (!items?.length) return null;
  return (
    <section className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold">{heading}</h2>
      <ul className="mt-6 flex flex-wrap gap-3">
        {items.map((item) => (
          <li key={item.id || item.name} className="rounded-full border border-white/10 px-4 py-2 text-sm">
            {item.name}
          </li>
        ))}
      </ul>
    </section>
  );
}

function CaseStudyRow({ studies }) {
  const list = Array.isArray(studies) ? studies.filter((item) => item && typeof item === "object") : [];
  if (!list.length) return null;
  return (
    <section className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold">Case studies</h2>
      <ul className="mt-8 grid gap-6 md:grid-cols-2">
        {list.map((study) => (
          <li key={study.id}>
            <Link href={`/case-studies/${study.slug}`} className="block rounded-2xl border border-white/10 p-6 hover:border-white/30">
              <h3 className="text-xl font-semibold">{study.title}</h3>
              <p className="mt-2 text-neutral-400">{study.client}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function TestimonialRow({ testimonials = [] }) {
  if (!testimonials.length) return null;
  return (
    <section className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold">Testimonials</h2>
      <ul className="mt-8 grid gap-6 md:grid-cols-2">
        {testimonials.map((item) => (
          <li key={item.id || item.name} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <blockquote>
              <p className="text-lg text-neutral-200">&ldquo;{item.quote}&rdquo;</p>
              <footer className="mt-4 text-sm text-neutral-400">
                {item.name}
                {item.role ? `, ${item.role}` : ""}
                {item.company ? `, ${item.company}` : ""}
              </footer>
            </blockquote>
          </li>
        ))}
      </ul>
    </section>
  );
}

function FaqList({ faqs }) {
  if (!faqs.length) return null;
  return (
    <section className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold">FAQs</h2>
      <div className="mt-8 space-y-4">
        {faqs.map((faq) => (
          <details key={faq.id || faq.question} className="rounded-2xl border border-white/10 p-5">
            <summary className="cursor-pointer text-lg font-semibold">{faq.question}</summary>
            <p className="mt-3 text-neutral-300">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function CtaBlock({ cta }) {
  if (!cta?.heading) return null;
  return (
    <section className="container mx-auto px-6 pb-24">
      <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-14 text-center">
        <h2 className="text-3xl font-bold md:text-5xl">{cta.heading}</h2>
        {cta.body ? <p className="mx-auto mt-4 max-w-2xl text-neutral-300">{cta.body}</p> : null}
        {cta.buttonLabel ? (
          <Link href={cta.buttonHref || "/contact"} className="mt-8 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-black">
            {cta.buttonLabel}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
