import { Check } from "lucide-react";

interface PricingFeatureListProps {
  features: Array<{ label: string; highlighted?: boolean }>;
}

export function PricingFeatureList({ features }: PricingFeatureListProps) {
  return (
    <ul className="space-y-3">
      {features.map((feature) => (
        <li key={feature.label} className="flex items-center gap-3">
          <Check className="h-5 w-5 shrink-0 text-blue-400" />
          <span
            className={
              feature.highlighted ? "font-semibold text-white" : "text-zinc-300"
            }
          >
            {feature.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
