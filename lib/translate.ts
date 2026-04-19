import Anthropic from "@anthropic-ai/sdk";

const LANGUAGE_NAMES: Record<string, string> = {
  en: "English",
  es: "Spanish",
  de: "German",
};

export type TranslatableFields = {
  date: string;
  recapBody: string;
  agendaSublabel: string;
  agendaBody: string;
  geopoliticsBody: string;
  tomorrowLabel: string;
  tomorrowBody: string;
  readingBody: string;
};

export async function translateDailyBrief(
  frenchContent: TranslatableFields,
  targetLocale: string,
): Promise<TranslatableFields> {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn("[translate] ANTHROPIC_API_KEY not set, skipping translation");
    return frenchContent;
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const languageName = LANGUAGE_NAMES[targetLocale];

  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: `Translate the following JSON values from French to ${languageName}.
Preserve all formatting: bullet points (•), emojis, newlines, numbers, financial terms, ticker symbols (EUR/USD, CAC, DAX, S&P 500, etc.).
Adapt date formats to the target locale convention.
Return ONLY valid JSON with the exact same keys. No explanation.

${JSON.stringify(frenchContent, null, 2)}`,
      },
    ],
  });

  const text =
    message.content[0].type === "text" ? message.content[0].text : "";
  return JSON.parse(text);
}
