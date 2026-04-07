import Image from "next/image";

interface GuideStepCardProps {
  stepNumber: number;
  title: string;
  content: string;
  imageUrl?: string | null;
  imageAlt?: string;
  tip?: string | null;
  tipLabel: string;
}

export function GuideStepCard({
  stepNumber,
  title,
  content,
  imageUrl,
  imageAlt,
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
          <p className="leading-relaxed text-zinc-300">{content}</p>

          {/* Image */}
          {imageUrl ? (
            <div className="overflow-hidden rounded-xl border border-zinc-800">
              <Image
                src={imageUrl}
                alt={imageAlt || title}
                width={800}
                height={400}
                className="w-full object-cover"
              />
            </div>
          ) : (
            <div className="flex h-[200px] items-center justify-center rounded-xl bg-zinc-800 text-sm text-zinc-600">
              Screenshot placeholder
            </div>
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
