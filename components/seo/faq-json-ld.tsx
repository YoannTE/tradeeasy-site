import { getPayload } from "payload";
import config from "@payload-config";

export async function FaqJsonLd() {
  const payload = await getPayload({ config });

  const { docs: faqs } = await payload.find({
    collection: "faqs",
    limit: 50,
    sort: "displayOrder",
  });

  if (faqs.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
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
