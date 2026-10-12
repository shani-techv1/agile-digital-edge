import Image from "next/image";
import Link from "next/link";
import CaseStudyView from "../analytics/CaseStudyView";
import { CtaSet } from "../cta/CtaLink";
import Breadcrumbs from "../seo/Breadcrumbs";
import JsonLd from "../seo/JsonLd";
import RelatedLinks from "../seo/RelatedLinks";
import { mediaUrl } from "../../lib/seo";
import { breadcrumbSchema } from "../../lib/schema";

export default function CaseStudyPage({ story }) {
  const crumbName = story.meta?.breadcrumbTitle || story.title;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Case studies", path: "/case-studies" },
    { name: crumbName, path: `/case-studies/${story.slug}` },
  ];
  const logo = mediaUrl(story.logo);

  return (
    <article className="bg-black text-white">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <CaseStudyView slug={story.slug} title={story.title} />
      <header className="container mx-auto px-6 pt-32 pb-12">
        <Breadcrumbs items={crumbs} />
        <p className="text-sm uppercase tracking-wide text-primary">{story.client}</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-bold md:text-6xl">{story.title}</h1>
        <dl className="mt-8 grid gap-4 text-sm text-neutral-300 sm:grid-cols-2 lg:grid-cols-4">
          <Fact label="Client" value={story.client} />
          <Fact label="Industry" value={story.industry} />
          <Fact label="Platform" value={story.platform} />
          <Fact label="Existing platform" value={story.existingPlatform} />
        </dl>
        {logo ? <Image src={logo} alt={`${story.client} logo`} width={160} height={64} className="mt-8 h-12 w-auto object-contain" /> : null}
      </header>

      <ShotList shots={story.screenshots} />
      <Prose heading="Challenge" body={story.challenge} />
      <Prose heading="Requirements" body={story.requirements} />
      <Prose heading="Solution" body={story.solution} />
      <CardList heading="Features" items={story.features} />
      <TagList heading="Services" items={story.services} />
      <TagList heading="Integrations" items={(story.integrations || []).map((item) => item.name)} />
      <TagList heading="Technology" items={story.technology} />
      <Results results={story.results} />
      <Testimonial testimonial={story.testimonial} />
      <RelatedLinks caseStudies={story.related} services={story.relatedServices} />
      <Cta cta={story.cta} />
      <CtaSet />
    </article>
  );
}

function Fact({ label, value }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-neutral-500">{label}</dt>
      <dd className="mt-1 text-base text-white">{value}</dd>
    </div>
  );
}

function ShotList({ shots = [] }) {
  const images = shots
    .map((shot) => ({ ...shot, src: mediaUrl(shot.image) || shot.imageUrl }))
    .filter((shot) => shot.src);
  if (!images.length) return null;
  return (
    <section className="container mx-auto grid gap-6 px-6 pb-8 md:grid-cols-2">
      {images.map((shot) => (
        <figure key={shot.id || shot.src} className="overflow-hidden rounded-3xl border border-white/10">
          <div className="relative aspect-[16/10]">
            <Image src={shot.src} alt={shot.alt || "Project screenshot"} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </figure>
      ))}
    </section>
  );
}

function Prose({ heading, body }) {
  if (!body) return null;
  return (
    <section className="container mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold">{heading}</h2>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-neutral-300">{body}</p>
    </section>
  );
}

function CardList({ heading, items = [] }) {
  if (!items.length) return null;
  return (
    <section className="container mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold">{heading}</h2>
      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <li key={item.id || item.title} className="rounded-2xl border border-white/10 p-5">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            {item.description ? <p className="mt-2 text-neutral-400">{item.description}</p> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

function TagList({ heading, items = [] }) {
  if (!items?.length) return null;
  return (
    <section className="container mx-auto px-6 py-6">
      <h2 className="text-2xl font-bold">{heading}</h2>
      <ul className="mt-4 flex flex-wrap gap-3">
        {items.map((item) => (
          <li key={item} className="rounded-full border border-white/10 px-4 py-2 text-sm">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Results({ results = [] }) {
  if (!results.length) return null;
  return (
    <section className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold">Results</h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-3">
        {results.map((result) => (
          <li key={result.id || result.label} className="rounded-2xl bg-white/5 p-6">
            <p className="text-3xl font-bold text-white">{result.value}</p>
            <p className="mt-2 text-neutral-400">{result.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Testimonial({ testimonial }) {
  if (!testimonial?.quote) return null;
  return (
    <section className="container mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold">Testimonial</h2>
      <blockquote className="mt-4 max-w-3xl text-xl text-neutral-200">
        <p>&ldquo;{testimonial.quote}&rdquo;</p>
        <footer className="mt-4 text-base text-neutral-400">
          {testimonial.name}
          {testimonial.role ? `, ${testimonial.role}` : ""}
        </footer>
      </blockquote>
    </section>
  );
}

function Cta({ cta }) {
  if (!cta?.heading) return null;
  return (
    <section className="container mx-auto px-6 pb-24">
      <div className="rounded-3xl border border-white/10 px-8 py-14 text-center">
        <h2 className="text-3xl font-bold">{cta.heading}</h2>
        {cta.body ? <p className="mx-auto mt-4 max-w-2xl text-neutral-300">{cta.body}</p> : null}
        <Link href={cta.buttonHref || "/contact"} className="mt-8 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-black">
          {cta.buttonLabel || "Contact us"}
        </Link>
      </div>
    </section>
  );
}
