import LegalPage from "../../../components/LegalPage";
import { termsAndConditions } from "../../../data/terms";
import { buildMetadata } from "../../../lib/seo";

export const metadata = buildMetadata({
  title: "Agile Digital Edge Terms & Conditions",
  description:
    "Terms & Conditions governing use of the Agile Digital Edge website and services.",
  path: "/terms-and-conditions",
});

export default function TermsAndConditionsPage() {
  return (
    <LegalPage
      title={termsAndConditions.title}
      effectiveDate={"Jan 2026"}
      sections={termsAndConditions.sections}
    />
  );
}
