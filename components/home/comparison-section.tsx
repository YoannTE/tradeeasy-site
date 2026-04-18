import { getTranslations } from "next-intl/server";
import { Check, X } from "lucide-react";

const rowKeys = ["signals", "exits", "learning", "price", "method"] as const;

export async function ComparisonSection() {
  const t = await getTranslations("comparison");

  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-white">
          {t("title")}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-zinc-400 md:text-base">
          {t("subtitle")}
        </p>
        <div className="mx-auto mt-4 h-1 w-12 rounded bg-blue-500" />

        <div className="mt-10 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 md:mt-14">
          <div className="grid grid-cols-3 border-b border-zinc-800 bg-zinc-900">
            <div className="p-3 text-[11px] font-medium uppercase tracking-wider text-zinc-500 md:p-6 md:text-sm">
              {t("headers.feature")}
            </div>
            <div className="p-3 text-center text-[11px] font-medium text-zinc-400 md:p-6 md:text-sm">
              {t("headers.others")}
            </div>
            <div className="p-3 text-center text-[11px] font-bold text-blue-400 md:p-6 md:text-sm">
              {t("headers.simplify")}
            </div>
          </div>

          {rowKeys.map((key, idx) => (
            <div
              key={key}
              className={`grid grid-cols-3 ${
                idx !== rowKeys.length - 1 ? "border-b border-zinc-800" : ""
              }`}
            >
              <div className="flex items-center p-3 text-sm font-medium text-white md:p-6 md:text-base">
                {t(`rows.${key}.feature`)}
              </div>
              <div className="flex items-center justify-center p-3 text-center md:p-6">
                <div className="flex items-start gap-1.5 md:gap-2">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600 md:h-5 md:w-5" />
                  <span className="text-xs text-zinc-500 md:text-sm">
                    {t(`rows.${key}.others`)}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center bg-blue-500/5 p-3 text-center md:p-6">
                <div className="flex items-start gap-1.5 md:gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-400 md:h-5 md:w-5" />
                  <span className="text-xs font-medium text-white md:text-sm">
                    {t(`rows.${key}.simplify`)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
