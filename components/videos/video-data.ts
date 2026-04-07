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
  youtubeUrl: string;
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
    titleKey: "items.install.title",
    descriptionKey: "items.install.description",
    category: "installation",
    categoryKey: "categories.installation",
    youtubeUrl: "#",
  },
  {
    id: "2",
    titleKey: "items.signals.title",
    descriptionKey: "items.signals.description",
    category: "usage",
    categoryKey: "categories.usage",
    youtubeUrl: "#",
  },
  {
    id: "3",
    titleKey: "items.forex.title",
    descriptionKey: "items.forex.description",
    category: "strategy",
    categoryKey: "categories.strategy",
    youtubeUrl: "#",
  },
  {
    id: "4",
    titleKey: "items.live.title",
    descriptionKey: "items.live.description",
    category: "trading_live",
    categoryKey: "categories.tradingLive",
    youtubeUrl: "#",
  },
];
