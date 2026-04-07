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

export async function PricingCardMonthly() {
  const t = await getTranslations("pricing");

  const features = featureKeys.map((key) => ({
    label: t(`features.${key}`),
  }));

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 md:p-8">
      <h3 className="text-xl font-bold text-white">{t("monthly.name")}</h3>

      <div className="mt-4">
        <span className="text-3xl md:text-5xl font-extrabold text-white">
          {t("monthly.price")}
        </span>
        <span className="ml-1 text-lg text-zinc-400">
          {t("monthly.period")}
        </span>
      </div>

      <p className="mt-1 text-sm text-zinc-500">{t("monthly.billing")}</p>

      <div className="my-6 border-t border-zinc-800" />

      <PricingFeatureList features={features} />

      <Button
        variant="outline"
        className="mt-8 w-full"
        nativeButton={false}
        render={<Link href="/pricing" />}
      >
        {t("monthly.cta")}
      </Button>

      <p className="mt-3 text-center text-xs text-zinc-500">
        {t("monthly.note")}
      </p>
    </div>
  );
}
