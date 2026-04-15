import { getTranslations } from "next-intl/server";
import { PricingCards } from "@/components/pricing/pricing-cards";
import { GuaranteeBadge } from "@/components/pricing/guarantee-badge";
import { PricingFaq } from "@/components/pricing/pricing-faq";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";

export const revalidate = 3600;

export async function generateMetadata() {
  const t = await getTranslations("metadata.pricing");
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: "https://simplify-pro.com/pricing",
      siteName: "SimplifyPro",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function PricingPage() {
  const t = await getTranslations("pricing");

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:py-20">
      <FaqJsonLd />
      <div className="mb-8 md:mb-12 text-center">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white">
          {t("title")}
        </h1>
        <p className="mt-2 text-sm md:text-lg text-zinc-400">{t("subtitle")}</p>
      </div>

      <PricingCards />
      <GuaranteeBadge />
      <PricingFaq />
    </section>
  );
}
