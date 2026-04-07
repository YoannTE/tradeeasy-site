import { getTranslations } from "next-intl/server";
import { LegalPageLayout } from "@/components/legal/legal-page-layout";
import { TermsContent } from "@/components/legal/terms-content";

export const revalidate = 3600;

export async function generateMetadata() {
  const t = await getTranslations("legal.terms");
  const title = `${t("title")} — SimplifyPro`;
  // Note: no dedicated metadata key for legal pages description — using fallback
  const description =
    "Terms of Service for the SimplifyPro trading indicator platform.";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "https://simplifypro.com/legal/terms",
      siteName: "SimplifyPro",
      type: "website",
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
    },
  };
}

export default async function TermsPage() {
  const t = await getTranslations("legal.terms");

  return (
    <LegalPageLayout title={t("title")} lastUpdated="March 25, 2026">
      <TermsContent />
    </LegalPageLayout>
  );
}
