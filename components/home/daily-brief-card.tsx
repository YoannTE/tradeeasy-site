import { getPayload } from "payload";
import config from "@payload-config";
import { getTranslations } from "next-intl/server";
import {
  TrendingDown,
  AlertTriangle,
  Globe2,
  Calendar,
  BookOpen,
} from "lucide-react";

export async function DailyBriefCard() {
  const t = await getTranslations("marketNews.dailyBrief");
  let brief: Record<string, unknown> | null = null;
  try {
    const payload = await getPayload({ config });
    brief = await payload.findGlobal({ slug: "daily-brief" });
  } catch {
    brief = null;
  }

  const date = (brief?.date as string) || t("date");
  const recapBody = (brief?.recapBody as string) || t("recapBody");
  const agendaSublabel = (brief?.agendaSublabel as string) || t("agendaSublabel");
  const agendaBody = (brief?.agendaBody as string) || t("agendaBody");
  const geopoliticsBody = (brief?.geopoliticsBody as string) || t("geopoliticsBody");
  const tomorrowLabel = (brief?.tomorrowLabel as string) || t("tomorrowLabel");
  const tomorrowBody = (brief?.tomorrowBody as string) || t("tomorrowBody");
  const readingBody = (brief?.readingBody as string) || t("readingBody");

  return (
    <div className="mt-10 max-w-4xl mx-auto rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-4">
        <span className="text-lg">📰</span>
        <h3 className="text-lg font-semibold text-white">{t("title")}</h3>
        <span className="text-xs text-zinc-500">· {date}</span>
      </div>

      <div className="mt-5 space-y-5">
        <div className="rounded-lg border-l-4 border-red-500 bg-red-500/5 p-4">
          <div className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-red-400" />
            <span className="text-xs font-semibold uppercase tracking-wide text-red-400">
              {t("recapLabel")}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-zinc-300 whitespace-pre-line">
            {recapBody}
          </p>
        </div>

        <div className="rounded-lg border-l-4 border-amber-500 bg-amber-500/5 p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-wide text-amber-400">
              {t("agendaLabel")}
            </span>
            {agendaSublabel && (
              <span className="text-xs text-amber-300/70">
                · {agendaSublabel}
              </span>
            )}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-zinc-300 whitespace-pre-line">
            {agendaBody}
          </p>
        </div>

        <div className="rounded-lg border-l-4 border-blue-500 bg-blue-500/5 p-4">
          <div className="flex items-center gap-2">
            <Globe2 className="h-4 w-4 text-blue-400" />
            <span className="text-xs font-semibold uppercase tracking-wide text-blue-400">
              {t("geopoliticsLabel")}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-zinc-300 whitespace-pre-line">
            {geopoliticsBody}
          </p>
        </div>

        <div className="rounded-lg border-l-4 border-zinc-600 bg-zinc-800/50 p-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-zinc-400" />
            <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
              {tomorrowLabel}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-zinc-300 whitespace-pre-line">
            {tomorrowBody}
          </p>
        </div>

        <div className="rounded-lg border-l-4 border-emerald-500 bg-emerald-500/5 p-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-semibold uppercase tracking-wide text-emerald-400">
              {t("readingLabel")}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-zinc-300 whitespace-pre-line">
            {readingBody}
          </p>
        </div>
      </div>
    </div>
  );
}
