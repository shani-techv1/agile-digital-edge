import Link from "next/link";
import { buildMetadata } from "../../../../lib/seo";

export const metadata = buildMetadata({
  title: "Audit request received | Agile Digital Edge",
  description: "Your ecommerce audit request has been received.",
  path: "/free-ecommerce-audit/thank-you",
  noindex: true,
});

export default function AuditThankYouPage() {
  return (
    <article className="relative overflow-hidden bg-black px-6 pb-24 pt-36 text-white">
      <div className="pointer-events-none absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
      <div className="relative mx-auto max-w-2xl rounded-[28px] border border-white/10 bg-white/[0.04] p-8 md:p-12">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-blue">Audit request</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">Request received</h1>
        <p className="mt-6 text-lg leading-relaxed text-neutral-300">
          Thanks for the details. We will review the store and reply by email with the next step.
        </p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-neutral-100">
          Back to the homepage
        </Link>
      </div>
    </article>
  );
}
