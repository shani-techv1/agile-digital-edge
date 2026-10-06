import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  Clock3,
  Code2,
  Layers3,
  MessageSquareText,
  RefreshCw,
  Workflow,
} from "lucide-react";

export const metadata = {
  title: "Why Agile Digital Edge | Flexible Engineering Partner",
  description:
    "Work directly with an engineering team through a flexible project or dedicated-team engagement, with timezone overlap and ongoing platform support.",
};

const reasons = [
  {
    number: "01",
    icon: Clock3,
    title: "Timezone overlap, planned around you",
    description:
      "We can arrange working-hour overlap for clients in Australia, the UK, Canada, and the US. Collaboration windows, handovers, and response expectations are agreed at the start of the engagement.",
    detail: "Shared hours are agreed per team and project",
  },
  {
    number: "02",
    icon: Workflow,
    title: "The engagement fits the work",
    description:
      "Bring us a defined project with clear milestones, or build a dedicated team for an evolving roadmap. Scope, roles, communication, and delivery cadence are shaped around the way your business operates.",
    detail: "Project-based or dedicated team",
  },
  {
    number: "03",
    icon: Code2,
    title: "Commerce experience across platforms",
    description:
      "We work with Shopify, WordPress, and BigCommerce, from new builds and custom features to integrations, migrations, and improvements to existing stores and sites.",
    detail: "Shopify · WordPress · BigCommerce",
  },
  {
    number: "04",
    icon: MessageSquareText,
    title: "Talk to the people doing the work",
    description:
      "Keep communication close to implementation. Get direct access to developers for technical decisions, progress, and trade-offs, with a clear point of contact to keep priorities moving.",
    detail: "Direct developer access",
  },
  {
    number: "05",
    icon: Layers3,
    title: "Add capacity without building every role in-house",
    description:
      "Extend your existing team with the skills a project needs. Scale the engagement to the agreed scope instead of taking on the full recruitment and employment overhead of growing an internal team for every delivery spike.",
    detail: "A practical way to extend delivery capacity",
  },
  {
    number: "06",
    icon: RefreshCw,
    title: "Support beyond launch",
    description:
      "Keep the people who understand your codebase involved after release. Maintenance and support can be arranged as an ongoing engagement, with 24/7 coverage available when the service plan and agreed response requirements call for it.",
    detail: "Long-term maintenance · 24/7 coverage by arrangement",
  },
];

export default function WhyAgilePage() {
  return (
    <div className="min-h-screen bg-[#080b0a] pt-32 text-white md:pt-40">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(16,185,129,0.10),transparent_42%),linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:auto,48px_48px,48px_48px]" />
        <div className="container relative mx-auto grid gap-12 px-6 pb-20 pt-8 md:grid-cols-[1fr_280px] md:items-end md:pb-28">
          <div className="max-w-4xl">
            <p className="mb-6 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
              <span className="h-px w-8 bg-emerald-400" /> Why Agile Digital Edge
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.08] sm:text-5xl md:text-7xl">
              An engineering partner that fits the way you work.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 md:text-xl">
              Agile Digital Edge works with businesses that need dependable
              engineering delivery, clear communication, and support that can
              continue after launch.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center gap-3 bg-emerald-400 px-5 font-semibold text-[#07110d] transition-colors hover:bg-emerald-300"
              >
                Talk through your needs <ArrowRight size={17} />
              </Link>
              <a
                href="#how-we-work"
                className="inline-flex min-h-12 items-center gap-2 border border-white/20 px-5 font-medium text-white/80 transition-colors hover:border-white/50 hover:text-white"
              >
                See how we work <ArrowDownRight size={17} />
              </a>
            </div>
          </div>
          <aside className="border-l border-emerald-300/40 pl-6 md:mb-1">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
              Built for collaboration
            </p>
            <dl className="mt-5 space-y-5">
              <div>
                <dt className="text-2xl font-semibold">Flexible</dt>
                <dd className="mt-1 text-sm text-white/55">Delivery built around your needs</dd>
              </div>
              <div>
                <dt className="text-2xl font-semibold">4 regions</dt>
                <dd className="mt-1 text-sm text-white/55">Timezone overlap planned for AU, UK, Canada, and US</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="container mx-auto px-6 py-20 md:py-28" id="how-we-work">
        <div className="mb-12 grid gap-6 md:grid-cols-[1fr_340px] md:items-end">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-300">
              The practical difference
            </p>
            <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
              A working model designed around delivery, not distance.
            </h2>
          </div>
          <p className="leading-relaxed text-white/55">
            Clear ways to engage, direct access to the team, and expectations
            agreed before work begins.
          </p>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {reasons.map(({ number, icon: Icon, title, description, detail }) => (
            <article key={number} className="grid gap-5 py-7 md:grid-cols-[64px_1fr_240px] md:items-start md:gap-8 md:py-9">
              <span className="pt-1 font-mono text-sm text-emerald-300">{number}</span>
              <div className="flex gap-4">
                <Icon className="mt-1 h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />
                <div>
                  <h3 className="text-xl font-semibold md:text-2xl">{title}</h3>
                  <p className="mt-3 max-w-3xl leading-relaxed text-white/60">{description}</p>
                </div>
              </div>
              <p className="pl-9 text-sm font-medium text-white/75 md:pl-0 md:pt-1">{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="container mx-auto grid gap-8 px-6 py-16 md:grid-cols-[1fr_1.2fr] md:items-center md:py-20">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-300">
              Flexible by design
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">Start with the shape of the work.</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="flex items-center gap-2 font-semibold"><Workflow size={18} className="text-emerald-300" /> Project delivery</p>
              <p className="mt-3 leading-relaxed text-white/55">For a defined outcome, with scope, milestones, and acceptance agreed together.</p>
            </div>
            <div>
              <p className="flex items-center gap-2 font-semibold"><Layers3 size={18} className="text-emerald-300" /> Dedicated capacity</p>
              <p className="mt-3 leading-relaxed text-white/55">For ongoing roadmaps, with a team aligned to your backlog and collaboration rhythm.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto flex flex-col gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between md:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-300">Have a project in mind?</p>
          <h2 className="mt-3 text-3xl font-semibold">Let&apos;s find a sensible way to deliver it.</h2>
        </div>
        <Link
          href="/contact"
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 bg-white px-5 font-semibold text-[#07110d] transition-colors hover:bg-emerald-200"
        >
          Contact the team <ArrowRight size={17} />
        </Link>
      </section>
    </div>
  );
}