"use client";

import Link from "next/link";
import { track } from "../../lib/analytics";

const VARIANTS = {
  audit: { label: "Get a Free Ecommerce Audit", href: "/free-ecommerce-audit" },
  consult: { label: "Book a Consultation", href: "/contact", event: "book_a_call" },
  partner: { label: "Become an Agency Partner", href: "/white-label-software-developer" },
  migration: { label: "Get a Free Migration Assessment", href: "/free-ecommerce-audit?intent=migration" },
  shopify: { label: "Talk to a Shopify Developer", href: "/contact?topic=shopify" },
};

export function CtaLink({ variant, className = "" }) {
  const item = VARIANTS[variant];
  if (!item) return null;
  return (
    <Link
      href={item.href}
      onClick={() => {
        if (item.event) track(item.event, { link_url: item.href, cta: item.label });
      }}
      className={`inline-flex rounded-full bg-white px-6 py-3 text-center font-semibold text-black transition hover:bg-neutral-100 ${className}`}
    >
      {item.label}
    </Link>
  );
}

export function CtaSet() {
  return (
    <section className="container mx-auto px-6 pb-24">
      <h2 className="text-2xl font-semibold">Next step</h2>
      <div className="mt-6 flex flex-wrap gap-3">
        {Object.keys(VARIANTS).map((variant) => (
          <CtaLink key={variant} variant={variant} />
        ))}
      </div>
    </section>
  );
}
