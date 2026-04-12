import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md";
}

export function Logo({ size = "md" }: LogoProps) {
  const iconSize = size === "sm" ? 28 : 34;
  const textClass =
    size === "sm"
      ? "text-3xl font-black tracking-tight"
      : "text-4xl font-black tracking-tight";

  return (
    <Link href="/" className="flex items-center gap-2 group">
      <Image
        src="/images/logo-simplifypro.png"
        alt="SimplifyPro"
        width={iconSize}
        height={iconSize}
        className="object-contain"
        priority
      />
      <span className={`${textClass} leading-none text-white`}>
        SimplifyPro
      </span>
    </Link>
  );
}
