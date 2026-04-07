"use client";

import { useTranslations } from "next-intl";
import { categoryKeys } from "./video-data";

interface CategoryFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function CategoryFilter({
  activeFilter,
  onFilterChange,
}: CategoryFilterProps) {
  const t = useTranslations("videos.categories");

  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {categoryKeys.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onFilterChange(cat.value)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            activeFilter === cat.value
              ? "bg-blue-500 text-white"
              : "bg-zinc-800 text-zinc-400 hover:text-white"
          }`}
        >
          {t(cat.key)}
        </button>
      ))}
    </div>
  );
}
