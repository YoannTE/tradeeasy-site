"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { ChevronDown } from "lucide-react";

const languages = [
  { code: "en", flag: "\u{1F1EC}\u{1F1E7}", label: "EN" },
  { code: "fr", flag: "\u{1F1EB}\u{1F1F7}", label: "FR" },
  { code: "es", flag: "\u{1F1EA}\u{1F1F8}", label: "ES" },
  { code: "de", flag: "\u{1F1E9}\u{1F1EA}", label: "DE" },
] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = languages.find((l) => l.code === locale) ?? languages[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(code: string) {
    if (code === locale) {
      setOpen(false);
      return;
    }
    document.cookie = `locale=${code};path=/;max-age=31536000`;
    window.location.reload();
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-base text-zinc-300 transition-colors hover:bg-zinc-700"
        aria-label="Change language"
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <ChevronDown className="h-4 w-4 text-zinc-500" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-32 overflow-hidden rounded-lg border border-zinc-700 bg-zinc-800 shadow-xl">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-zinc-700 ${
                lang.code === locale
                  ? "bg-zinc-700/50 text-white"
                  : "text-zinc-300"
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
