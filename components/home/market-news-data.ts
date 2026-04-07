export interface PlaceholderNewsItem {
  source: string;
  titleKey: string;
  time: string;
  url: string;
  category: string;
}

export const placeholderNews: PlaceholderNewsItem[] = [
  {
    source: "Bloomberg",
    titleKey: "news1",
    time: "2h",
    url: "https://www.bloomberg.com/markets",
    category: "forex",
  },
  {
    source: "Investing.com",
    titleKey: "news2",
    time: "3h",
    url: "https://www.investing.com",
    category: "forex",
  },
  {
    source: "Financial Juice",
    titleKey: "news3",
    time: "4h",
    url: "https://www.financialjuice.com",
    category: "crypto",
  },
  {
    source: "Reuters",
    titleKey: "news4",
    time: "5h",
    url: "https://www.reuters.com/markets",
    category: "indices",
  },
  {
    source: "CNBC",
    titleKey: "news5",
    time: "6h",
    url: "https://www.cnbc.com/markets",
    category: "indices",
  },
];
