"use client";

import Image from "next/image";
import { useState } from "react";

const assetMeta: Record<string, { name: string; timeframe: string }> = {
  dax40: { name: "DAX 40", timeframe: "1 minute Chart" },
  bitcoin: { name: "Bitcoin", timeframe: "1 hour Chart" },
  eurusd: { name: "EUR/USD", timeframe: "15 minutes Chart" },
  gold: { name: "Gold", timeframe: "3 minutes Chart" },
  dowjones: { name: "Dow Jones", timeframe: "5 minutes Chart" },
  nasdaq: { name: "Nasdaq", timeframe: "1 minute Chart" },
  sp500: { name: "S&P 500", timeframe: "" },
  solana: { name: "Solana", timeframe: "" },
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

function getAssetName(asset: string) {
  return assetMeta[asset]?.name ?? asset;
}

function getTimeframe(asset: string) {
  return assetMeta[asset]?.timeframe ?? "";
}

export function DailyPerformanceGrid({
  screenshots,
}: DailyPerformanceGridProps) {
  const [selectedImage, setSelectedImage] = useState<Screenshot | null>(null);

  return (
    <>
      <div className="mt-6 md:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {screenshots.map((item) => {
          const name = getAssetName(item.asset);
          const timeframe = getTimeframe(item.asset);

          return (
            <button
              key={item.asset}
              type="button"
              onClick={() => setSelectedImage(item)}
              className="group rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden transition-all hover:border-zinc-600 hover:shadow-lg hover:shadow-blue-500/5 text-left"
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={item.image.url}
                  alt={item.image.alt || name}
                  fill
                  className="object-cover transition-transform group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="px-4 py-3">
                <p className="text-sm md:text-base font-semibold text-white">
                  {name}
                </p>
                {timeframe && (
                  <p className="mt-0.5 text-xs md:text-sm text-zinc-400">
                    {timeframe}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
          onKeyDown={(e) => e.key === "Escape" && setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label={getAssetName(selectedImage.asset)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh]">
            <div className="absolute -top-10 left-0 right-0 flex items-center justify-between">
              <span className="text-lg font-semibold text-white">
                {getAssetName(selectedImage.asset)}
                {getTimeframe(selectedImage.asset) && (
                  <span className="ml-2 text-sm font-normal text-zinc-400">
                    · {getTimeframe(selectedImage.asset)}
                  </span>
                )}
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
              alt={selectedImage.image.alt || getAssetName(selectedImage.asset)}
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
