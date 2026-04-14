import { getTranslations } from "next-intl/server";
import { Newspaper } from "lucide-react";
import { placeholderNews } from "./market-news-data";
import { NewsItem } from "./news-item";
import { DailyBriefCard } from "./daily-brief-card";

export async function MarketNewsSection() {
  const t = await getTranslations("marketNews");

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3">
          <Newspaper className="h-7 w-7 text-blue-500" />
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white">
            {t("title")}
          </h2>
        </div>
        <p className="mt-4 text-center text-zinc-400 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>

        <DailyBriefCard />

        <div className="mt-10 max-w-4xl mx-auto rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="flex flex-col">
            {placeholderNews.map((item, index) => {
              const timePrefix = t("timePrefix");
              const timeSuffix = t("timeSuffix");
              const formattedTime = [timePrefix, item.time, timeSuffix]
                .filter(Boolean)
                .join(" ");

              return (
                <NewsItem
                  key={item.titleKey}
                  source={item.source}
                  title={t(item.titleKey)}
                  time={formattedTime}
                  url={item.url}
                  isLast={index === placeholderNews.length - 1}
                />
              );
            })}
          </div>

          <div className="mt-4 border-t border-zinc-800 pt-4">
            <p className="text-center text-xs text-zinc-600">
              {t("poweredBy")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
