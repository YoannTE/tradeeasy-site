/**
 * Extrait l'identifiant d'une video YouTube a partir de differents formats d'URL
 * (watch?v=, youtu.be/, /embed/). Retourne null si l'URL n'est pas reconnue.
 */
export function getYouTubeId(url: string): string | null {
  if (!url) return null;

  const patterns = [
    /(?:youtube\.com\/watch\?v=)([\w-]{11})/,
    /(?:youtu\.be\/)([\w-]{11})/,
    /(?:youtube\.com\/embed\/)([\w-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}

/** URL de l'iframe d'integration pour une video YouTube donnee. */
export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
}

/** URL de la miniature haute resolution d'une video YouTube. */
export function getYouTubeThumbnail(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}
