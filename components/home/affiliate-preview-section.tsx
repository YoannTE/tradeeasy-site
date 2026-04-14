import Link from "next/link";
import { DollarSign } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";

const statKeys = ["stat1", "stat2", "stat3"] as const;

export async function AffiliatePreviewSection() {
  const t = await getTranslations("affiliatePreview");

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 md:p-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-5 py-1.5 text-base md:text-lg font-medium text-amber-400 mb-4">
            <DollarSign className="h-5 w-5" />
            {t("badge")}
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {t("title")}
          </h2>
          <p className="mt-3 text-zinc-400 max-w-2xl leading-relaxed">
            {t("description")}
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4 md:gap-8">
            {statKeys.map((key) => (
              <div key={key} className="text-center">
                <p className="text-2xl md:text-3xl font-extrabold text-amber-400">
                  {t(`${key}Value`)}
                </p>
                <p className="mt-1 text-xs md:text-sm text-zinc-400">
                  {t(`${key}Label`)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Button
              size="lg"
              variant="outline"
              className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
              nativeButton={false}
              render={<Link href="/affiliate" />}
            >
              {t("cta")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
