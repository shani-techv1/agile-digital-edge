"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PLATFORMS } from "../../lib/leads/validate";
import { readStoredUtm } from "../seo/UtmCapture";

const COUNTRIES = [
  "Australia", "Canada", "United Kingdom", "United States", "India", "New Zealand",
  "Singapore", "United Arab Emirates", "Germany", "France", "Netherlands", "Ireland",
  "Sweden", "Norway", "Denmark", "Switzerland", "Spain", "Italy", "Belgium", "Austria",
  "South Africa", "Japan", "South Korea", "Brazil", "Mexico", "Other",
];

export default function AuditForm({ submitLabel = "Request the audit" }) {
  const router = useRouter();
  const [formStartedAt, setFormStartedAt] = useState(0);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setFormStartedAt(Date.now());
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    setPending(true);
    setMessage("");
    setErrors({});
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    payload.formStartedAt = formStartedAt;
    Object.assign(payload, readStoredUtm());

    const response = await fetch("/api/audit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json().catch(() => ({}));
    setPending(false);

    if (!response.ok) {
      setErrors(data.errors || {});
      setMessage(data.message || "Check the form and try again.");
      return;
    }

    router.push("/free-ecommerce-audit/thank-you");
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" error={errors.name} autoComplete="name" required />
        <Field label="Business email" name="email" type="email" error={errors.email} autoComplete="email" required />
        <Field label="Company" name="company" error={errors.company} autoComplete="organization" required />
        <Field label="Website URL" name="website" type="url" error={errors.website} placeholder="https://" autoComplete="url" required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField label="Country" name="country" error={errors.country} placeholder="Select a country" options={COUNTRIES} />
        <SelectField label="Ecommerce platform" name="platform" error={errors.platform} placeholder="Select a platform" options={PLATFORMS} />
      </div>
      <label className="grid gap-2 text-sm">
        <span className="font-medium text-neutral-200">Requirement</span>
        <textarea
          name="requirement"
          required
          minLength={20}
          rows={4}
          placeholder="What should we look at first?"
          className={controlClass(errors.requirement)}
        />
        {errors.requirement ? <span className="text-rose-300">{errors.requirement}</span> : null}
      </label>
      <label className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        Company website
        <input name="website_hp" tabIndex={-1} autoComplete="off" />
      </label>
      {message ? <p className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">{message}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="mt-1 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3.5 font-semibold text-black transition hover:bg-neutral-100 disabled:opacity-60"
      >
        {pending ? "Sending..." : submitLabel}
      </button>
    </form>
  );
}

function controlClass(error) {
  return [
    "w-full rounded-xl border bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400",
    "focus:border-primary focus:ring-2 focus:ring-primary/30",
    error ? "border-rose-400" : "border-transparent",
  ].join(" ");
}

function Field({ label, name, error, ...props }) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-medium text-neutral-200">{label}</span>
      <input name={name} className={controlClass(error)} {...props} />
      {error ? <span className="text-rose-300">{error}</span> : null}
    </label>
  );
}

function SelectField({ label, name, error, placeholder, options }) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-medium text-neutral-200">{label}</span>
      <span className="relative">
        <select name={name} defaultValue="" required className={`${controlClass(error)} appearance-none pr-10`}>
          <option value="" disabled>{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <svg viewBox="0 0 20 20" aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500">
          <path d="M5 7.5 10 12.5 15 7.5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </span>
      {error ? <span className="text-rose-300">{error}</span> : null}
    </label>
  );
}
