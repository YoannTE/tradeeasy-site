import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { PricingFeatureList } from "./pricing-feature-list";

const featureKeys = [
  "indicator",
  "allMarkets",
  "allTimeframes",
  "signals",
  "tutorials",
  "emailSupport",
] as const;

const highlightedKeys = ["prioritySupport", "twoMonthsFree"] as const;

export async function PricingCardAnnual() {
  const t = await getTranslations("pricing");

  const features = [
    ...featureKeys.map((key) => ({
      label: t(`features.${key}`),
    })),
    ...highlightedKeys.map((key) => ({
      label: t(`features.${key}`),
      highlighted: true,
    })),
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-blue-500 bg-zinc-900 p-5 md:p-8 shadow-lg shadow-blue-500/10">
      <span className="absolute right-4 top-4 rounded-full bg-blue-500 px-3 py-1 text-xs font-bold text-white">
        {t("annual.badge")}
      </span>

      <h3 className="text-xl font-bold text-white">{t("annual.name")}</h3>

      <div className="mt-4">
        <span className="text-3xl md:text-5xl font-extrabold text-white">
          {t("annual.price")}
        </span>
        <span className="ml-1 text-lg text-zinc-400">{t("annual.period")}</span>
      </div>

      <div className="mt-1 flex items-center gap-2">
        <span className="text-sm text-zinc-400">{t("annual.perMonth")}</span>
        <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-xs text-amber-400">
          {t("annual.save")}
        </span>
      </div>

      <p className="mt-1 text-sm text-zinc-500">{t("annual.billing")}</p>

      <div className="my-6 border-t border-zinc-800" />

      <PricingFeatureList features={features} />

      <Button
        className="mt-8 w-full"
        nativeButton={false}
        render={<Link href="/signup?plan=annual" />}
      >
        {t("annual.cta")}
      </Button>

      <p className="mt-3 text-center text-xs text-zinc-500">
        {t("annual.note")}
      </p>
    </div>
  );
}
