import { getTranslations } from "next-intl/server";
import { DailyPerformanceGrid } from "@/components/home/daily-performance-grid";

const STATIC_SCREENSHOTS = [
  {
    asset: "dax40",
    image: { url: "/images/daily-performance/dax40.png", alt: "DAX 40 chart" },
  },
  {
    asset: "bitcoin",
    image: {
      url: "/images/daily-performance/bitcoin.png",
      alt: "Bitcoin chart",
    },
  },
  {
    asset: "eurusd",
    image: {
      url: "/images/daily-performance/eur-usd.png",
      alt: "EUR/USD chart",
    },
  },
  {
    asset: "gold",
    image: { url: "/images/daily-performance/gold.png", alt: "Gold chart" },
  },
  {
    asset: "dowjones",
    image: {
      url: "/images/daily-performance/dow-jones.png",
      alt: "Dow Jones chart",
    },
  },
  {
    asset: "nasdaq",
    image: {
      url: "/images/daily-performance/nasdaq.png",
      alt: "Nasdaq chart",
    },
  },
];

export async function LivePerformanceSection() {
  const t = await getTranslations("performance");

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-white">
          {t("title")}
        </h2>
        <p className="mt-2 text-sm md:text-base text-center text-zinc-400 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>

        <DailyPerformanceGrid screenshots={STATIC_SCREENSHOTS} />
      </div>
    </section>
  );
}
