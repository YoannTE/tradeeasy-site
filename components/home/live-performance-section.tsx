import { getTranslations } from "next-intl/server";
import { DailyPerformanceGrid } from "@/components/home/daily-performance-grid";

const staticScreenshots = [
  {
    asset: "nasdaq",
    image: {
      url: "/images/daily-performance/nasdaq.png",
      alt: "Nasdaq daily performance",
    },
  },
  {
    asset: "dowjones",
    image: {
      url: "/images/daily-performance/dow-jones.png",
      alt: "Dow Jones daily performance",
    },
  },
  {
    asset: "sp500",
    image: {
      url: "/images/daily-performance/s-p500.png",
      alt: "S&P 500 daily performance",
    },
  },
  {
    asset: "gold",
    image: {
      url: "/images/daily-performance/gold.png",
      alt: "Gold daily performance",
    },
  },
  {
    asset: "dax40",
    image: {
      url: "/images/daily-performance/dax40.png",
      alt: "DAX 40 daily performance",
    },
  },
  {
    asset: "eurusd",
    image: {
      url: "/images/daily-performance/eur-usd.png",
      alt: "EUR/USD daily performance",
    },
  },
  {
    asset: "bitcoin",
    image: {
      url: "/images/daily-performance/bitcoin.png",
      alt: "Bitcoin daily performance",
    },
  },
  {
    asset: "solana",
    image: {
      url: "/images/daily-performance/solana.png",
      alt: "Solana daily performance",
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

        <DailyPerformanceGrid
          screenshots={staticScreenshots}
          date={new Date().toISOString()}
        />
      </div>
    </section>
  );
}
