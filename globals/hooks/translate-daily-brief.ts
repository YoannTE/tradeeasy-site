import type { GlobalAfterChangeHook } from "payload";
import { translateDailyBrief, type TranslatableFields } from "@/lib/translate";

const TARGET_LOCALES = ["en", "es", "de"] as const;

const TRANSLATABLE_FIELDS: (keyof TranslatableFields)[] = [
  "date",
  "recapBody",
  "agendaSublabel",
  "agendaBody",
  "geopoliticsBody",
  "tomorrowLabel",
  "tomorrowBody",
  "readingBody",
];

export const translateDailyBriefHook: GlobalAfterChangeHook = async ({
  doc,
  req,
  context,
}) => {
  if (context?.skipTranslation) return doc;

  const frenchContent = {} as TranslatableFields;
  for (const field of TRANSLATABLE_FIELDS) {
    frenchContent[field] = (doc[field] as string) || "";
  }

  const hasContent = Object.values(frenchContent).some((v) => v.length > 0);
  if (!hasContent) return doc;

  const results = await Promise.allSettled(
    TARGET_LOCALES.map(async (locale) => {
      const translated = await translateDailyBrief(frenchContent, locale);
      await req.payload.updateGlobal({
        slug: "daily-brief",
        locale,
        data: translated,
        context: { skipTranslation: true },
      });
    }),
  );

  for (const [i, result] of results.entries()) {
    if (result.status === "rejected") {
      console.error(
        `[translate] Failed for ${TARGET_LOCALES[i]}:`,
        result.reason,
      );
    }
  }

  return doc;
};
