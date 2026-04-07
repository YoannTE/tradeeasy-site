import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md";
}

export function Logo({ size = "md" }: LogoProps) {
  const iconScale = size === "sm" ? 0.7 : 0.85;
  const textClass =
    size === "sm"
      ? "text-xl font-black tracking-tight"
      : "text-2xl font-black tracking-tight";

  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      {/* 3 ascending bars icon */}
      <svg
        viewBox="0 0 46 72"
        fill="none"
        style={{ height: `${Math.round(72 * iconScale)}px`, width: "auto" }}
        aria-hidden="true"
      >
        <rect x="0" y="43" width="13" height="29" rx="2" fill="white" />
        <rect x="17" y="22" width="13" height="50" rx="2" fill="white" />
        <rect x="34" y="0" width="13" height="72" rx="2" fill="white" />
      </svg>

      {/* Wordmark */}
      <span className={`${textClass} leading-none text-white`}>
        SimplifyPro
      </span>
    </Link>
  );
}
