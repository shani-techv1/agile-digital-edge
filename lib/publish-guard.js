export function landingPublishErrors(data) {
  if (!data || data._status !== "published") return [];

  const errors = [];
  if (!text(data.hero?.heading)) errors.push("hero heading");
  if (!text(data.problem?.heading) && !text(data.problem?.body)) errors.push("problem");
  if (!text(data.solution?.heading) && !text(data.solution?.body)) errors.push("solution");

  const serviceCount = data.services?.items?.filter((item) => text(item?.title)).length || 0;
  const faqCount = data.faqs?.filter((item) => text(item?.question) && text(item?.answer)).length || 0;
  if (serviceCount === 0 && faqCount === 0) errors.push("at least one service or FAQ");

  if (data.pageType === "location" && !text(data.location?.country)) {
    errors.push("country for a location page");
  }
  if (!text(data.meta?.title)) errors.push("SEO title");
  if (!text(data.meta?.description)) errors.push("meta description");

  return errors;
}

export function assertLandingPublishable(data) {
  const errors = landingPublishErrors(data);
  if (errors.length) {
    const error = new Error(`Cannot publish until these are complete: ${errors.join(", ")}.`);
    error.status = 400;
    throw error;
  }
}

function text(value) {
  return typeof value === "string" && value.trim().length > 0;
}
