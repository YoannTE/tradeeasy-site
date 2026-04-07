export interface NewsArticle {
  source: string;
  title: string;
  time: string;
  url: string;
  category: string;
}

export async function fetchMarketNews(): Promise<NewsArticle[]> {
  // TODO: Replace with real API (NewsAPI, Finnhub, or RSS feeds)
  // For now, returns empty array — the component uses placeholder data as fallback
  return [];
}
