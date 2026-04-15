import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { ArrowRight, BookOpen } from "lucide-react";
import { VideoGrid } from "@/components/videos/video-grid";
import type { VideoItem } from "@/components/videos/video-grid";

export const revalidate = 3600;

export async function generateMetadata() {
  const t = await getTranslations("metadata.videos");
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: "https://simplify-pro.com/videos",
      siteName: "SimplifyPro",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function VideosPage() {
  const t = await getTranslations("videos");
  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: "videos",
    limit: 50,
    sort: "displayOrder",
  });

  const videos: VideoItem[] = docs.map((doc) => ({
    id: String(doc.id),
    title: doc.title,
    description: doc.description ?? "",
    category: doc.category ?? "usage",
    youtubeUrl: doc.youtubeUrl,
  }));

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      {/* Guide banner */}
      <div className="mb-8 flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4">
        <BookOpen className="h-5 w-5 shrink-0 text-blue-400" />
        <p className="text-sm text-zinc-400">
          {t("guideBanner")}{" "}
          <Link
            href="/guides"
            className="inline-flex items-center gap-1 text-blue-400 transition-colors hover:text-blue-300"
          >
            {t("guideBannerLink")}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </p>
      </div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-white">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg text-zinc-400">{t("subtitle")}</p>
      </div>

      <VideoGrid videos={videos} />
    </section>
  );
}
