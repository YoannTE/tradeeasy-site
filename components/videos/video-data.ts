export type VideoCategory =
  | "installation"
  | "usage"
  | "strategy"
  | "trading_live";

export interface Video {
  id: string;
  titleKey: string;
  descriptionKey: string;
  category: VideoCategory;
  categoryKey: string;
  /** Cle de traduction : l'URL YouTube change selon la langue du site. */
  youtubeUrlKey: string;
}

export const categoryKeys = [
  { value: "all" as const, key: "all" },
  { value: "installation" as const, key: "installation" },
  { value: "usage" as const, key: "usage" },
  { value: "strategy" as const, key: "strategy" },
  { value: "trading_live" as const, key: "tradingLive" },
];

export const videos: Video[] = [
  {
    id: "1",
    titleKey: "items.presentation.title",
    descriptionKey: "items.presentation.description",
    category: "usage",
    categoryKey: "categories.usage",
    youtubeUrlKey: "items.presentation.youtubeUrl",
  },
];
