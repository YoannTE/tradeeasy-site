import { getTranslations } from "next-intl/server";
import { GuideList } from "@/components/guides/guide-list";

export const revalidate = 3600;

export async function generateMetadata() {
  const t = await getTranslations("metadata.guides");
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: "https://simplify-pro.com/guides",
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

export default async function GuidesPage() {
  const t = await getTranslations("guides");

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-white">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg text-zinc-400">{t("subtitle")}</p>
      </div>

      <GuideList />
    </section>
  );
}
