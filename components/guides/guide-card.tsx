import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface GuideCardProps {
  title: string;
  slug: string;
  description: string;
  categoryLabel: string;
  difficultyLabel: string;
  difficulty: string;
  stepsCount: number;
  estimatedTime: string;
  readGuideLabel: string;
  stepsLabel: string;
  minLabel: string;
}

export function GuideCard({
  title,
  slug,
  description,
  categoryLabel,
  difficultyLabel,
  difficulty,
  stepsCount,
  estimatedTime,
  readGuideLabel,
  stepsLabel,
  minLabel,
}: GuideCardProps) {
  const difficultyColor =
    difficulty === "beginner"
      ? "bg-green-500/10 text-green-400"
      : difficulty === "intermediate"
        ? "bg-amber-500/10 text-amber-400"
        : "bg-red-500/10 text-red-400";

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition-colors hover:border-zinc-700">
      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs text-blue-400">
            {categoryLabel}
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs ${difficultyColor}`}
          >
            {difficultyLabel}
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-3 font-semibold text-white">{title}</h3>

        {/* Description */}
        <p className="mt-2 flex-1 text-sm text-zinc-400">{description}</p>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-zinc-500">
            {stepsCount} {stepsLabel} · ~{estimatedTime} {minLabel}
          </span>
          <Link
            href={`/guides/${slug}`}
            className="inline-flex items-center gap-1 text-sm text-blue-400 transition-colors hover:text-blue-300"
          >
            {readGuideLabel}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
