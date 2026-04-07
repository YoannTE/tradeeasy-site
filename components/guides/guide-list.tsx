import { getTranslations } from "next-intl/server";
import { GuideCard } from "./guide-card";
import { GuideInstallIcon } from "./guide-install-icon";
import {
  getPlaceholderGuides,
  type PlaceholderGuide,
} from "./guide-placeholder-data";

interface PayloadGuide {
  title: string;
  slug: string;
  description?: string | null;
  category?: string | null;
  difficulty?: string | null;
  estimatedTime?: string | null;
  steps?: { stepTitle: string }[] | null;
}

async function fetchGuides(): Promise<PlaceholderGuide[] | null> {
  try {
    const { getPayload } = await import("payload");
    const payload = await getPayload({
      config: (await import("@payload-config")).default,
    });
    const result = await payload.find({
      collection: "guides",
      where: { published: { equals: true } },
      sort: "order",
      limit: 50,
    });

    if (result.docs.length === 0) return null;

    return (result.docs as unknown as PayloadGuide[]).map((doc) => ({
      title: doc.title,
      slug: doc.slug,
      description: doc.description || "",
      category: (doc.category as PlaceholderGuide["category"]) || "usage",
      difficulty:
        (doc.difficulty as PlaceholderGuide["difficulty"]) || "beginner",
      estimatedTime: doc.estimatedTime || "5",
      steps: (doc.steps || []).map((s) => ({
        stepTitle: s.stepTitle,
        stepContent: "",
      })),
    }));
  } catch {
    return null;
  }
}

export async function GuideList() {
  const t = await getTranslations("guides");

  const dbGuides = await fetchGuides();
  const guides = dbGuides ?? getPlaceholderGuides(t);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {guides.map((guide) => (
        <GuideCard
          key={guide.slug}
          title={guide.title}
          slug={guide.slug}
          description={guide.description}
          categoryLabel={t(`categories.${guide.category}`)}
          difficultyLabel={t(`difficulty.${guide.difficulty}`)}
          difficulty={guide.difficulty}
          stepsCount={guide.steps.length}
          estimatedTime={guide.estimatedTime}
          readGuideLabel={t("readGuide")}
          stepsLabel={t("steps")}
          minLabel={t("minutes")}
          customIcon={
            guide.category === "installation" ? <GuideInstallIcon /> : undefined
          }
        />
      ))}
    </div>
  );
}
