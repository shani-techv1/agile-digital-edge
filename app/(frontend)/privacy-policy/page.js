import LegalPage from "../../../components/LegalPage";
import { privacyPolicy } from "../../../data/privacy-policy";
import { buildMetadata } from "../../../lib/seo";

export const metadata = buildMetadata({
  title: "Agile Digital Edge Privacy Policy",
  description:
    "Privacy Policy for Agile Digital Edge — how we collect, use, and protect your personal information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title={privacyPolicy.title}
      effectiveDate={"Jan 2026"}
      sections={privacyPolicy.sections}
    />
  );
}
