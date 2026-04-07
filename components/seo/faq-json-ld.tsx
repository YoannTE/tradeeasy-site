import { getTranslations } from "next-intl/server";

const faqKeys = [
  "trial",
  "afterTrial",
  "cancel",
  "access",
  "markets",
  "advice",
] as const;

export async function FaqJsonLd() {
  const t = await getTranslations("pricing.faq.items");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqKeys.map((key) => ({
      "@type": "Question",
      name: t(`${key}.question`),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(`${key}.answer`),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
