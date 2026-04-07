import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface GuideNavigationProps {
  currentSlug: string;
  allSlugs: string[];
}

export async function GuideNavigation({
  currentSlug,
  allSlugs,
}: GuideNavigationProps) {
  const t = await getTranslations("guides");

  const currentIndex = allSlugs.indexOf(currentSlug);
  const prevSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : null;
  const nextSlug =
    currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null;

  return (
    <div className="mt-12 flex flex-col gap-4 border-t border-zinc-800 pt-8 sm:flex-row sm:items-center sm:justify-between">
      {prevSlug ? (
        <Link
          href={`/guides/${prevSlug}`}
          className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous Guide
        </Link>
      ) : (
        <div />
      )}

      <Link
        href="/guides"
        className="inline-flex items-center gap-2 text-sm text-blue-400 transition-colors hover:text-blue-300"
      >
        {t("backToGuides")}
      </Link>

      {nextSlug ? (
        <Link
          href={`/guides/${nextSlug}`}
          className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
        >
          Next Guide
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
