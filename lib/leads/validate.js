import { z } from "zod";

const FREE_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.uk",
  "yahoo.co.in",
  "ymail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "msn.com",
  "icloud.com",
  "me.com",
  "mac.com",
]);

export const PLATFORMS = [
  "Shopify",
  "Shopify Plus",
  "BigCommerce",
  "WooCommerce",
  "Magento",
  "Adobe Commerce",
  "Custom",
  "Other",
];

export const auditLeadSchema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  email: z
    .string()
    .trim()
    .email("Enter a valid business email.")
    .refine((value) => !FREE_DOMAINS.has(value.split("@")[1]?.toLowerCase()), {
      message: "Use a business email address.",
    }),
  company: z.string().trim().min(2, "Enter your company name."),
  website: z
    .string()
    .trim()
    .url("Enter a valid website URL.")
    .refine((value) => /^https?:\/\//i.test(value), "Website URL must start with http or https."),
  country: z.string().trim().min(2, "Select a country."),
  platform: z.string().refine((value) => PLATFORMS.includes(value), "Select an ecommerce platform."),
  requirement: z.string().trim().min(20, "Describe the requirement in at least 20 characters."),
  website_hp: z.string().optional().default(""),
  formStartedAt: z.coerce.number({ message: "Refresh the page and try again." }),
  utmSource: z.string().optional().default(""),
  utmMedium: z.string().optional().default(""),
  utmCampaign: z.string().optional().default(""),
  utmTerm: z.string().optional().default(""),
  utmContent: z.string().optional().default(""),
  gclid: z.string().optional().default(""),
  referrer: z.string().optional().default(""),
  landingPath: z.string().optional().default(""),
});

export function fieldErrors(error) {
  const errors = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !errors[key]) errors[key] = issue.message;
  }
  return errors;
}
