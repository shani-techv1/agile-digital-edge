import LegalPage from "../../components/LegalPage";
import { termsAndConditions } from "../../data/terms";

export const metadata = {
  title: "Agile Digital Edge Terms & Conditions",
  description:
    "Terms & Conditions governing use of the Agile Digital Edge website and services.",
};

export default function TermsAndConditionsPage() {
  return (
    <LegalPage
      title={termsAndConditions.title}
      effectiveDate={"Jan 2026"}
      sections={termsAndConditions.sections}
    />
  );
}
