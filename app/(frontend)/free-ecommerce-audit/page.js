import { Gauge, Layers, ShoppingBag } from "lucide-react";
import Breadcrumbs from "../../../components/seo/Breadcrumbs";
import JsonLd from "../../../components/seo/JsonLd";
import AuditForm from "../../../components/audit/AuditForm";
import { readGlobal } from "../../../lib/content";
import { metadataFromDoc } from "../../../lib/seo";
import { breadcrumbSchema } from "../../../lib/schema";

export const revalidate = 60;

const fallback = {
  heading: "Free ecommerce audit",
  intro:
    "Tell us about the store, the platform, and what needs to change. We review the request and reply with a practical next step for Shopify, BigCommerce, WooCommerce, or a migration.",
  submitLabel: "Request the audit",
};

const reviews = [
  {
    icon: Gauge,
    title: "Speed and checkout",
    body: "Where the storefront slows shoppers down, and what to fix first.",
  },
  {
    icon: Layers,
    title: "App and theme stack",
    body: "Which apps, scripts, and theme choices are adding weight.",
  },
  {
    icon: ShoppingBag,
    title: "Platform fit",
    body: "Whether to stay, rebuild, or migrate, with a practical next step.",
  },
];

const platforms = ["Shopify", "Shopify Plus", "BigCommerce", "WooCommerce"];

export async function generateMetadata() {
  const global = await readGlobal("auditPage");
  return metadataFromDoc(global, {
    path: "/free-ecommerce-audit",
    fallbackTitle: "Free Ecommerce Audit | Agile Digital Edge",
    fallbackDescription: fallback.intro,
  });
}

export default async function FreeAuditPage() {
  const global = await readGlobal("auditPage");
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Free ecommerce audit", path: "/free-ecommerce-audit" },
  ];

  return (
    <article className="relative overflow-hidden bg-black text-white">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <div className="pointer-events-none absolute -left-24 top-16 h-80 w-80 rounded-full bg-primary/25 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-[28rem] w-[28rem] rounded-full bg-secondary/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-accent-blue/10 blur-3xl" />

      <div className="container relative mx-auto grid gap-12 px-6 pb-24 pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16 lg:pt-40">
        <div>
          <Breadcrumbs items={crumbs} />
          <p className="mb-5 inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-accent-blue sm:text-xs">
            Complimentary review
          </p>
          <h1 className="max-w-xl text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            {global?.heading || fallback.heading}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-300">
            {global?.intro || fallback.intro}
          </p>

          <ul className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {reviews.map((item) => (
              <li key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <item.icon className="h-5 w-5 text-accent-blue" aria-hidden="true" />
                <h2 className="mt-3 text-sm font-semibold">{item.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-neutral-400">{item.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <span
                key={platform}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-neutral-300"
              >
                {platform}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] bg-gradient-to-br from-white/25 via-white/10 to-primary/40 p-px shadow-[0_30px_80px_-36px_rgba(59,130,246,0.85)] lg:sticky lg:top-28">
          <div className="rounded-[27px] bg-[#09090b]/95 p-6 backdrop-blur-xl md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">Tell us about the store</h2>
            <p className="mt-2 text-sm text-neutral-400">
              A business email and the live store URL are enough to start.
            </p>
            <AuditForm submitLabel={global?.submitLabel || fallback.submitLabel} />
          </div>
        </div>
      </div>
    </article>
  );
}
