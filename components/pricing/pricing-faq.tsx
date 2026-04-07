import { getTranslations } from "next-intl/server";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faqKeys = [
  "trial",
  "afterTrial",
  "guarantee",
  "cancel",
  "beginners",
  "freeIndicators",
  "access",
  "markets",
  "mobile",
  "switchPlan",
  "advice",
] as const;

export async function PricingFaq() {
  const t = await getTranslations("pricing.faq");

  return (
    <section className="mt-20">
      <h2 className="mb-10 text-center text-2xl font-bold text-white">
        {t("title")}
      </h2>

      <div className="mx-auto max-w-3xl rounded-xl border border-zinc-800 bg-zinc-900">
        <Accordion>
          {faqKeys.map((key, index) => (
            <AccordionItem
              key={index}
              className="border-b border-zinc-800 px-6 last:border-b-0"
            >
              <AccordionTrigger className="py-4 text-left text-white hover:no-underline">
                {t(`items.${key}.question`)}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-zinc-400">{t(`items.${key}.answer`)}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
