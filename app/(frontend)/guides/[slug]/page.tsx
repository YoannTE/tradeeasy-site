import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { GuideDetail } from "@/components/guides/guide-detail";
import { getPlaceholderGuides } from "@/components/guides/guide-placeholder-data";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const t = await getTranslations("guides");

  const placeholders = getPlaceholderGuides(t);
  const guide = placeholders.find((g) => g.slug === slug);

  const title = guide ? `${guide.title} — SimplifyPro` : "Guide — SimplifyPro";
  const description = guide?.description || t("subtitle");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://simplify-pro.com/guides/${slug}`,
      siteName: "SimplifyPro",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function GuideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const t = await getTranslations("guides");

  // Check if guide exists in placeholders (or DB via component)
  const placeholders = getPlaceholderGuides(t);
  const exists = placeholders.some((g) => g.slug === slug);

  if (!exists) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-20">
      <GuideDetail slug={slug} />
    </section>
  );
}
