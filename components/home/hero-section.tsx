import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";

export async function HeroSection() {
  const t = await getTranslations("hero");

  return (
    <section className="flex flex-col items-center px-4 pt-20 pb-12 md:pt-32 md:pb-20 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <span className="inline-block rounded-full bg-blue-500/10 px-4 py-1 text-sm text-blue-400 mb-8">
          {t("badge")}
        </span>

        {/* Title */}
        <h1 className="text-2xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
          <span className="text-white">{t("title1")}</span>
          <br />
          <span className="text-white">{t("title2")} </span>
          <span className="text-blue-500">{t("title3")}</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-sm md:text-lg text-zinc-400 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="px-6 py-3"
            nativeButton={false}
            render={<Link href="/pricing" />}
          >
            {t("cta")}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="px-6 py-3"
            nativeButton={false}
            render={<Link href="/videos" />}
          >
            {t("demo")}
          </Button>
        </div>

        {/* Sub-text */}
        <p className="mt-4 text-sm text-zinc-500">{t("noCharge")}</p>

        {/* Chart Preview */}
        <div className="mt-8 md:mt-16 w-full max-w-5xl mx-auto rounded-xl border border-zinc-800 overflow-hidden shadow-2xl shadow-black/50">
          <Image
            src="/images/simplifypro-chart.png"
            alt="SimplifyPro V6.3 indicator on TradingView chart"
            width={1920}
            height={1080}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
}
