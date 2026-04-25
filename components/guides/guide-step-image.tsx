"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface GuideStepImageProps {
  src: string;
  alt: string;
  closeLabel?: string;
}

export function GuideStepImage({
  src,
  alt,
  closeLabel = "Close (ESC)",
}: GuideStepImageProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group block w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 transition-all hover:border-zinc-600 hover:shadow-lg hover:shadow-blue-500/5"
        aria-label={alt}
      >
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={900}
          className="w-full h-auto object-contain transition-transform group-hover:scale-[1.01]"
        />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          <div className="relative max-w-6xl w-full max-h-[90vh]">
            <div className="absolute -top-10 left-0 right-0 flex items-center justify-between">
              <span className="text-sm md:text-base font-medium text-white truncate pr-4">
                {alt}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-zinc-400 hover:text-white text-sm shrink-0"
              >
                {closeLabel}
              </button>
            </div>
            <Image
              src={src}
              alt={alt}
              width={1920}
              height={1080}
              className="rounded-lg w-full h-auto max-h-[85vh] object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
