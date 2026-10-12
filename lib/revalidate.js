import { revalidatePath } from "next/cache";
import { APIError } from "payload";
import { assertLandingPublishable } from "../lib/publish-guard";

export function guardLandingPublish({ data, originalDoc }) {
  const merged = {
    ...originalDoc,
    ...data,
    hero: { ...(originalDoc?.hero || {}), ...(data?.hero || {}) },
    problem: { ...(originalDoc?.problem || {}), ...(data?.problem || {}) },
    solution: { ...(originalDoc?.solution || {}), ...(data?.solution || {}) },
    location: { ...(originalDoc?.location || {}), ...(data?.location || {}) },
    services: data?.services || originalDoc?.services,
    faqs: data?.faqs || originalDoc?.faqs,
    pageType: data?.pageType || originalDoc?.pageType,
    _status: data?._status || originalDoc?._status,
  };

  try {
    assertLandingPublishable(merged);
  } catch (error) {
    throw new APIError(error.message, 400);
  }

  return data;
}

export function revalidatePaths(paths) {
  for (const path of paths) {
    try {
      revalidatePath(path);
    } catch {
      // Hooks also run outside a Next.js request, including the first seed.
    }
  }
}
