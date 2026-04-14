import { getPayload } from "payload";
import config from "@payload-config";
import { getTranslations } from "next-intl/server";
import { DailyPerformanceGrid } from "@/components/home/daily-performance-grid";

interface MediaDoc {
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
}

export async function LivePerformanceSection() {
  const t = await getTranslations("performance");
  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: "daily-performance",
    limit: 1,
    sort: "-date",
    depth: 2,
  });

  const entry = docs[0];
  if (!entry || !entry.screenshots) return null;

  const screenshots = entry.screenshots.map(
    (item: {
      asset: string;
      timeframe?: string;
      image: MediaDoc | string;
    }) => {
      const media =
        typeof item.image === "object" ? (item.image as MediaDoc) : null;
      return {
        asset: item.asset,
        timeframe: item.timeframe,
        image: {
          url: media?.url ?? "",
          alt: media?.alt ?? item.asset,
          width: media?.width,
          height: media?.height,
        },
      };
    },
  );

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-white">
          {t("title")}
        </h2>
        <p className="mt-2 text-sm md:text-base text-center text-zinc-400 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>

        <DailyPerformanceGrid screenshots={screenshots} />
      </div>
    </section>
  );
}
