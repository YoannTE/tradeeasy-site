import { ArrowRight } from "lucide-react";

export function GuideInstallIcon() {
  return (
    <div className="flex items-center justify-center gap-5">
      {/* SimplifyPro logo */}
      <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-blue-500">
        <span className="font-[var(--font-exo2)] text-lg font-extrabold italic text-blue-500">
          SP
        </span>
      </div>

      {/* Arrow */}
      <ArrowRight className="h-6 w-6 text-zinc-500" />

      {/* TradingView logo */}
      <div className="flex h-14 w-auto flex-col items-center justify-center gap-1">
        <svg
          viewBox="0 0 56 34"
          fill="none"
          className="h-8 w-auto"
          aria-label="TradingView"
        >
          {/* T */}
          <path d="M2 2h14v5H12v16H8V7H2V2z" fill="#d1d5db" />
          {/* V with blue dot */}
          <path d="M20 2h5.5l6 16.5L38 2h5.5L33 27h-5L20 2z" fill="#d1d5db" />
          <rect x="44" y="2" width="7" height="7" rx="1" fill="#2962FF" />
        </svg>
        <span className="text-[9px] font-medium tracking-widest text-zinc-400">
          TradingView
        </span>
      </div>
    </div>
  );
}
