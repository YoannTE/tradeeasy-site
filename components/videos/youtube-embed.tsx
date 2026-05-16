"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { getYouTubeEmbedUrl, getYouTubeThumbnail } from "@/lib/videos/youtube";

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
}

/**
 * Lecteur YouTube integre avec chargement differe : la miniature s'affiche
 * d'abord, l'iframe n'est chargee qu'au clic (meilleure performance).
 */
export function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <div className="relative aspect-video w-full bg-black">
        <iframe
          src={getYouTubeEmbedUrl(videoId)}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsPlaying(true)}
      aria-label={title}
      className="group relative block aspect-video w-full overflow-hidden bg-black"
    >
      <Image
        src={getYouTubeThumbnail(videoId)}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
      <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-600 shadow-lg transition-transform duration-300 group-hover:scale-110">
        <Play className="h-6 w-6 translate-x-0.5 fill-white text-white" />
      </span>
    </button>
  );
}
