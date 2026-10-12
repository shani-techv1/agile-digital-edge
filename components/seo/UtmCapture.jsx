"use client";

import { useEffect } from "react";

const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"];

export default function UtmCapture() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const stored = readStored();
    let changed = false;

    for (const key of KEYS) {
      const value = params.get(key);
      if (value && !stored[key]) {
        stored[key] = value;
        changed = true;
      }
    }

    if (!stored.landingPath) {
      stored.landingPath = `${window.location.pathname}${window.location.search}`;
      changed = true;
    }

    if (!stored.referrer && document.referrer) {
      stored.referrer = document.referrer;
      changed = true;
    }

    if (changed) sessionStorage.setItem("ade_utm", JSON.stringify(stored));
  }, []);

  return null;
}

export function readStoredUtm() {
  const stored = readStored();
  return {
    utmSource: stored.utm_source || "",
    utmMedium: stored.utm_medium || "",
    utmCampaign: stored.utm_campaign || "",
    utmTerm: stored.utm_term || "",
    utmContent: stored.utm_content || "",
    gclid: stored.gclid || "",
    referrer: stored.referrer || "",
    landingPath: stored.landingPath || "",
  };
}

function readStored() {
  try {
    return JSON.parse(sessionStorage.getItem("ade_utm") || "{}");
  } catch {
    return {};
  }
}
