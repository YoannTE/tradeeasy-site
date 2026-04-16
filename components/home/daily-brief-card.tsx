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

  return (
    <div className="mt-10 max-w-4xl mx-auto rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-4">
        <span className="text-lg">📰</span>
        <h3 className="text-lg font-semibold text-white">{t("title")}</h3>
        <span className="text-xs text-zinc-500">· {t("date")}</span>
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
            {t("recapBody")}
          </p>
        </div>

        <div className="rounded-lg border-l-4 border-amber-500 bg-amber-500/5 p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-wide text-amber-400">
              {t("agendaLabel")}
            </span>
            <span className="text-xs text-amber-300/70">
              · {t("agendaSublabel")}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-zinc-300 whitespace-pre-line">
            {t("agendaBody")}
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
            {t("geopoliticsBody")}
          </p>
        </div>

        <div className="rounded-lg border-l-4 border-zinc-600 bg-zinc-800/50 p-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-zinc-400" />
            <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
              {t("tomorrowLabel")}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-zinc-300 whitespace-pre-line">
            {t("tomorrowBody")}
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
            {t("readingBody")}
          </p>
        </div>
      </div>
    </div>
  );
}
