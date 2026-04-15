import { getTranslations } from "next-intl/server";

export async function ProductJsonLd() {
  const t = await getTranslations("metadata.home");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SimplifyPro V6.0",
    description: t("description"),
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "24.50",
      priceCurrency: "USD",
      url: "https://simplify-pro.com/pricing",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
