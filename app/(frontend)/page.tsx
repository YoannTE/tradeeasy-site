import { getTranslations } from "next-intl/server";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
import { TradingViewSection } from "@/components/home/tradingview-section";
import { LivePerformanceSection } from "@/components/home/live-performance-section";
import { MarketNewsSection } from "@/components/home/market-news-section";
import { HowItWorksSection } from "@/components/home/how-it-works-section";
import { PricingPreviewSection } from "@/components/home/pricing-preview-section";
import { AffiliatePreviewSection } from "@/components/home/affiliate-preview-section";
import { CtaSection } from "@/components/home/cta-section";
import { ProductJsonLd } from "@/components/seo/product-json-ld";

export const revalidate = 3600;

export async function generateMetadata() {
  const t = await getTranslations("metadata.home");
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: "https://simplifypro.com",
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

export default function HomePage() {
  return (
    <>
      <ProductJsonLd />
      <HeroSection />
      <FeaturesSection />
      <TradingViewSection />
      <MarketNewsSection />
      <LivePerformanceSection />
      <HowItWorksSection />
      <PricingPreviewSection />
      <AffiliatePreviewSection />
      <CtaSection />
    </>
  );
}
