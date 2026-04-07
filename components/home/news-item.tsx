import { ExternalLink } from "lucide-react";

interface NewsItemProps {
  source: string;
  title: string;
  time: string;
  url: string;
  isLast: boolean;
}

const sourceStyles: Record<string, string> = {
  Bloomberg: "bg-purple-500/10 text-purple-400",
  "Investing.com": "bg-green-500/10 text-green-400",
  "Financial Juice": "bg-amber-500/10 text-amber-400",
  Reuters: "bg-blue-500/10 text-blue-400",
  CNBC: "bg-cyan-500/10 text-cyan-400",
};

export function NewsItem({ source, title, time, url, isLast }: NewsItemProps) {
  const badgeClass = sourceStyles[source] ?? "bg-zinc-500/10 text-zinc-400";
  const borderClass = isLast ? "" : "border-b border-zinc-800";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-4 py-3 ${borderClass} group`}
    >
      <span
        className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${badgeClass}`}
      >
        {source}
      </span>

      <span className="min-w-0 flex-1 truncate text-sm font-medium text-zinc-200 transition group-hover:text-white">
        {title}
      </span>

      <span className="shrink-0 text-xs text-zinc-500">{time}</span>

      <ExternalLink className="h-4 w-4 shrink-0 text-zinc-600" />
    </a>
  );
}
