"use client";

import { useEffect } from "react";
import { track } from "../../lib/analytics";

export default function TrackClicks() {
  useEffect(() => {
    function onClick(event) {
      const link = event.target.closest("a");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      if (href.startsWith("tel:")) track("phone_click", { link_url: href });
      else if (href.startsWith("mailto:")) track("email_click", { link_url: href });
      else if (href.includes("wa.me") || href.includes("api.whatsapp.com")) {
        track("whatsapp_click", { link_url: href });
      }
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
