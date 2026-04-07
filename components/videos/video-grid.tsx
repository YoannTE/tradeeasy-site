"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CategoryFilter } from "./category-filter";
import { VideoCard } from "./video-card";
import { videos } from "./video-data";

export function VideoGrid() {
  const t = useTranslations("videos");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredVideos =
    activeFilter === "all"
      ? videos
      : videos.filter((v) => v.category === activeFilter);

  return (
    <div>
      <CategoryFilter
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredVideos.map((video) => (
          <VideoCard
            key={video.id}
            title={t(video.titleKey)}
            description={t(video.descriptionKey)}
            categoryLabel={t(video.categoryKey)}
            youtubeUrl={video.youtubeUrl}
            watchLabel={t("watchOnYouTube")}
          />
        ))}
      </div>
    </div>
  );
}
