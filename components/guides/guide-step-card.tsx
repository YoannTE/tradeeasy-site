import { GuideStepImage } from "./guide-step-image";

interface GuideStepCardProps {
  stepNumber: number;
  title: string;
  content?: string;
  imageUrl?: string | null;
  imageAlt?: string;
  subSteps?: string[];
  tip?: string | null;
  tipLabel: string;
}

export function GuideStepCard({
  stepNumber,
  title,
  content,
  imageUrl,
  imageAlt,
  subSteps,
  tip,
  tipLabel,
}: GuideStepCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex items-start gap-4">
        {/* Step number circle */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
          {stepNumber}
        </div>

        <div className="flex-1 space-y-4">
          {/* Title */}
          <h3 className="font-semibold text-white">{title}</h3>

          {/* Content */}
          {content && (
            <p className="leading-relaxed text-zinc-300">{content}</p>
          )}

          {/* Image */}
          {imageUrl ? (
            <GuideStepImage src={imageUrl} alt={imageAlt || title} />
          ) : (
            <div className="flex h-[200px] items-center justify-center rounded-xl bg-zinc-800 text-sm text-zinc-600">
              Screenshot placeholder
            </div>
          )}

          {/* Sub-steps (numbered, matching arrow numbers in the screenshot) */}
          {subSteps && subSteps.length > 0 && (
            <ol className="space-y-3">
              {subSteps.map((sub, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-xs font-semibold text-blue-400">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed text-zinc-300">{sub}</span>
                </li>
              ))}
            </ol>
          )}

          {/* Tip */}
          {tip && (
            <div className="rounded-lg border-l-2 border-blue-500 bg-blue-500/5 p-4">
              <p className="text-xs font-semibold uppercase text-blue-400">
                {tipLabel}
              </p>
              <p className="mt-1 text-sm text-zinc-300">{tip}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
