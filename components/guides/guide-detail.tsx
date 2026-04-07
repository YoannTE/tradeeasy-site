import { getTranslations } from "next-intl/server";
import { Clock, ListChecks } from "lucide-react";
import { GuideStepCard } from "./guide-step-card";
import { GuideNavigation } from "./guide-navigation";
import {
  getPlaceholderGuides,
  type PlaceholderGuide,
} from "./guide-placeholder-data";

interface PayloadStep {
  stepTitle: string;
  stepContent: string;
  stepImage?: { url: string } | null;
  stepTip?: string | null;
}

interface PayloadGuide {
  title: string;
  slug: string;
  description?: string | null;
  category?: string | null;
  difficulty?: string | null;
  estimatedTime?: string | null;
  steps?: PayloadStep[] | null;
}

async function fetchGuide(slug: string): Promise<PlaceholderGuide | null> {
  try {
    const { getPayload } = await import("payload");
    const payload = await getPayload({
      config: (await import("@payload-config")).default,
    });
    const result = await payload.find({
      collection: "guides",
      where: {
        slug: { equals: slug },
        published: { equals: true },
      },
      limit: 1,
    });

    if (result.docs.length === 0) return null;
    const doc = result.docs[0] as unknown as PayloadGuide;

    return {
      title: doc.title,
      slug: doc.slug,
      description: doc.description || "",
      category: (doc.category as PlaceholderGuide["category"]) || "usage",
      difficulty:
        (doc.difficulty as PlaceholderGuide["difficulty"]) || "beginner",
      estimatedTime: doc.estimatedTime || "5",
      steps: (doc.steps || []).map((s) => ({
        stepTitle: s.stepTitle,
        stepContent: s.stepContent,
        stepTip: s.stepTip || undefined,
        stepImage: s.stepImage?.url || undefined,
      })),
    };
  } catch {
    return null;
  }
}

interface GuideDetailProps {
  slug: string;
}

export async function GuideDetail({ slug }: GuideDetailProps) {
  const t = await getTranslations("guides");

  const dbGuide = await fetchGuide(slug);
  const placeholders = getPlaceholderGuides(t);
  const guide = dbGuide ?? placeholders.find((g) => g.slug === slug);

  if (!guide) return null;

  const difficultyColor =
    guide.difficulty === "beginner"
      ? "bg-green-500/10 text-green-400"
      : guide.difficulty === "intermediate"
        ? "bg-amber-500/10 text-amber-400"
        : "bg-red-500/10 text-red-400";

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
            {t(`categories.${guide.category}`)}
          </span>
          <span className={`rounded-full px-3 py-1 text-xs ${difficultyColor}`}>
            {t(`difficulty.${guide.difficulty}`)}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-zinc-500">
            <Clock className="h-3.5 w-3.5" />~{guide.estimatedTime}{" "}
            {t("minutes")}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-zinc-500">
            <ListChecks className="h-3.5 w-3.5" />
            {guide.steps.length} {t("steps")}
          </span>
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white">
          {guide.title}
        </h1>
        {guide.description && (
          <p className="mt-3 text-lg text-zinc-400">{guide.description}</p>
        )}
      </div>

      {/* Steps */}
      <div className="space-y-6">
        {guide.steps.map((step, index) => (
          <GuideStepCard
            key={index}
            stepNumber={index + 1}
            title={step.stepTitle}
            content={step.stepContent}
            imageUrl={step.stepImage}
            tip={step.stepTip}
            tipLabel={t("tip")}
          />
        ))}
      </div>

      {/* Navigation */}
      <GuideNavigation
        currentSlug={guide.slug}
        allSlugs={placeholders.map((g) => g.slug)}
      />
    </div>
  );
}
