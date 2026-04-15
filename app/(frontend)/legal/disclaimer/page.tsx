import { getTranslations } from "next-intl/server";
import { LegalPageLayout } from "@/components/legal/legal-page-layout";
import { DisclaimerContent } from "@/components/legal/disclaimer-content";

export const revalidate = 3600;

export async function generateMetadata() {
  const t = await getTranslations("legal.disclaimer");
  const title = `${t("title")} — SimplifyPro`;
  // Note: no dedicated metadata key for legal pages description — using fallback
  const description =
    "Important trading disclaimer and risk warning for SimplifyPro users.";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "https://simplify-pro.com/legal/disclaimer",
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

export default async function DisclaimerPage() {
  const t = await getTranslations("legal.disclaimer");

  return (
    <LegalPageLayout title={t("title")} lastUpdated="March 25, 2026">
      <DisclaimerContent />
    </LegalPageLayout>
  );
}
