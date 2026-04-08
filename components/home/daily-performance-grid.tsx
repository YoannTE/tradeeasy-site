"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";

const assetLabels: Record<string, string> = {
  nasdaq: "Nasdaq",
  dowjones: "Dow Jones",
  sp500: "S&P 500",
  gold: "Gold",
  dax40: "DAX 40",
  eurusd: "EUR/USD",
  bitcoin: "Bitcoin",
  solana: "Solana",
};

interface Screenshot {
  asset: string;
  image: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
}

interface DailyPerformanceGridProps {
  screenshots: Screenshot[];
}

export function DailyPerformanceGrid({
  screenshots,
}: DailyPerformanceGridProps) {
  const [selectedImage, setSelectedImage] = useState<Screenshot | null>(null);

  return (
    <>
      <div className="mt-6 md:mt-10 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        {screenshots.map((item) => (
          <button
            key={item.asset}
            type="button"
            onClick={() => setSelectedImage(item)}
            className="group rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden transition-all hover:border-zinc-600 hover:shadow-lg hover:shadow-blue-500/5 text-left"
          >
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={item.image.url}
                alt={item.image.alt || assetLabels[item.asset] || item.asset}
                fill
                className="object-cover transition-transform group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Play icon overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-black/60 text-white transition-transform group-hover:scale-110">
                  <Play
                    className="h-5 w-5 md:h-6 md:w-6 ml-0.5"
                    fill="currentColor"
                  />
                </div>
              </div>
            </div>
            <div className="px-3 py-2 md:px-4 md:py-3">
              <span className="text-xs md:text-sm font-medium text-white">
                {assetLabels[item.asset] || item.asset}
              </span>
            </div>
          </button>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
          onKeyDown={(e) => e.key === "Escape" && setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label={assetLabels[selectedImage.asset] || selectedImage.asset}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh]">
            <div className="absolute -top-10 left-0 right-0 flex items-center justify-between">
              <span className="text-lg font-semibold text-white">
                {assetLabels[selectedImage.asset] || selectedImage.asset}
              </span>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="text-zinc-400 hover:text-white text-sm"
              >
                Close (ESC)
              </button>
            </div>
            <Image
              src={selectedImage.image.url}
              alt={
                selectedImage.image.alt ||
                assetLabels[selectedImage.asset] ||
                selectedImage.asset
              }
              width={selectedImage.image.width || 1920}
              height={selectedImage.image.height || 1080}
              className="rounded-lg w-full h-auto max-h-[85vh] object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
