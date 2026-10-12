export function gaMeasurementId() {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
  return /^G-[A-Z0-9]+$/i.test(id) ? id : "";
}

export function track(name, params = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
