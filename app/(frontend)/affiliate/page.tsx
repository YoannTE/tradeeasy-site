import { getTranslations } from "next-intl/server";
import { AffiliateHero } from "@/components/affiliate/affiliate-hero";
import { AffiliateStats } from "@/components/affiliate/affiliate-stats";
import { AffiliateHowItWorks } from "@/components/affiliate/affiliate-how-it-works";
import { AffiliateBenefits } from "@/components/affiliate/affiliate-benefits";
import { AffiliateEarnings } from "@/components/affiliate/affiliate-earnings";
import { AffiliateForm } from "@/components/affiliate/affiliate-form";

export async function generateMetadata() {
  const t = await getTranslations("metadata.affiliate");
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: "https://simplify-pro.com/affiliate",
      siteName: "SimplifyPro",
      type: "website",
    },
  };
}

export default function AffiliatePage() {
  return (
    <div className="mx-auto max-w-7xl px-4">
      <AffiliateHero />
      <AffiliateStats />
      <AffiliateHowItWorks />
      <AffiliateBenefits />
      <AffiliateEarnings />
      <AffiliateForm />
    </div>
  );
}
