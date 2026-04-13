import Image from "next/image";
import { PlayCircle } from "lucide-react";

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
      {/* Thumbnail placeholder */}
      <div className="relative flex h-48 items-center justify-center overflow-hidden bg-zinc-800">
        <Image
          src="/images/chart-placeholder.png"
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <PlayCircle className="relative h-12 w-12 text-white/90" />
      </div>

      {/* Content */}
      <div className="p-4">
        <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-xs text-blue-400">
          {categoryLabel}
        </span>
        <h3 className="mt-2 font-semibold text-white">{title}</h3>
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
