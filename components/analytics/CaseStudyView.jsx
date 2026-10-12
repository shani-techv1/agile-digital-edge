"use client";

import { useEffect } from "react";
import { track } from "../../lib/analytics";

export default function CaseStudyView({ slug, title }) {
  useEffect(() => {
    track("case_study_view", {
      page_path: `/case-studies/${slug}`,
      page_title: title || slug,
    });
  }, [slug, title]);

  return null;
}
