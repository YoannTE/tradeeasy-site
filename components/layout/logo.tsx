import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md";
}

export function Logo({ size = "md" }: LogoProps) {
  const circleSize = size === "sm" ? "h-10 w-10" : "h-12 w-12";
  const monoSize = size === "sm" ? "text-sm" : "text-base";
  const nameSize = size === "sm" ? "text-2xl" : "text-3xl";
  return (
    <Link href="/" className="flex items-center gap-3 group">
      {/* Monogram circle */}
      <div
        className={`${circleSize} rounded-full border-2 border-blue-500 flex items-center justify-center flex-shrink-0`}
      >
        <span
          className={`font-[var(--font-exo2)] italic font-extrabold ${monoSize} text-blue-500`}
        >
          SP
        </span>
      </div>

      {/* Text */}
      <span
        className={`${nameSize} font-black tracking-tight leading-none text-blue-500`}
      >
        SimplifyPro
      </span>
    </Link>
  );
}
