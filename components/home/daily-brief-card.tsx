import { getTranslations } from "next-intl/server";
import { Flame, Globe2 } from "lucide-react";

export async function DailyBriefCard() {
  const t = await getTranslations("marketNews.dailyBrief");

  return (
    <div className="mt-10 max-w-4xl mx-auto rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-4">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/10 text-amber-400">
          🔥
        </span>
        <h3 className="text-lg font-semibold text-white">{t("title")}</h3>
      </div>

      <div className="mt-5 space-y-5">
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-wide text-amber-400">
              {t("catalystLabel")}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-zinc-200">
            {t("catalystBody")}
          </p>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-950/40 p-4">
          <div className="flex items-center gap-2">
            <Globe2 className="h-4 w-4 text-blue-400" />
            <span className="text-xs font-semibold uppercase tracking-wide text-blue-400">
              {t("contextLabel")}
            </span>
            <span className="text-xs text-zinc-500">
              · {t("contextSubtitle")}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-zinc-300">
            {t("contextBody")}
          </p>
        </div>
      </div>
    </div>
  );
}
