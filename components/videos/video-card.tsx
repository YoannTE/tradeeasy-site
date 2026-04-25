interface VideoCardProps {
  title: string;
  description: string;
  categoryLabel: string;
  youtubeUrl: string;
  watchLabel: string;
}

export function VideoCard({
  title,
  description,
  categoryLabel,
  youtubeUrl,
  watchLabel,
}: VideoCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
      <div className="p-5">
        <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs text-blue-400">
          {categoryLabel}
        </span>
        <h3 className="mt-3 font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm text-zinc-400">{description}</p>
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm text-blue-400 transition-colors hover:text-blue-300"
        >
          {watchLabel}
        </a>
      </div>
    </div>
  );
}
