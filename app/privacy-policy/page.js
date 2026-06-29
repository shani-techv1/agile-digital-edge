import LegalPage from "../../components/LegalPage";
import { privacyPolicy } from "../../data/privacy-policy";

export const metadata = {
  title: "Agile Digital Edge Privacy Policy",
  description:
    "Privacy Policy for Agile Digital Edge — how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title={privacyPolicy.title}
      effectiveDate={privacyPolicy.effectiveDate}
      sections={privacyPolicy.sections}
    />
  );
}
