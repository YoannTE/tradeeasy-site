import { getPayload } from "payload";
import config from "@payload-config";
import { getTranslations } from "next-intl/server";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export async function PricingFaq() {
  const t = await getTranslations("pricing.faq");
  const payload = await getPayload({ config });

  const { docs: faqs } = await payload.find({
    collection: "faqs",
    limit: 50,
    sort: "displayOrder",
  });

  if (faqs.length === 0) return null;

  return (
    <section className="mt-20">
      <h2 className="mb-10 text-center text-2xl font-bold text-white">
        {t("title")}
      </h2>

      <div className="mx-auto max-w-3xl rounded-xl border border-zinc-800 bg-zinc-900">
        <Accordion>
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.id}
              className="border-b border-zinc-800 px-6 last:border-b-0"
            >
              <AccordionTrigger className="py-4 text-left text-white hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-zinc-400">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
