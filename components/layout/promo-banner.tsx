"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

const PROMO_END_DATE = new Date("2026-06-30T23:59:59");
const STORAGE_KEY = "promo-banner-dismissed";

function getTimeLeft() {
  const now = new Date();
  const diff = PROMO_END_DATE.getTime() - now.getTime();
  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="rounded bg-white/10 px-2 py-1 text-base font-bold tabular-nums md:px-2.5 md:text-lg">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-0.5 text-[10px] uppercase text-blue-200/70">
        {label}
      </span>
    </div>
  );
}

export function PromoBanner() {
  const t = useTranslations("promoBanner");
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem(STORAGE_KEY);
    setDismissed(!!wasDismissed);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = getTimeLeft();
      if (!remaining) {
        clearInterval(interval);
      }
      setTimeLeft(remaining);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (dismissed || !timeLeft) return null;

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem(STORAGE_KEY, "1");
  };

  return (
    <div className="relative z-50 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 px-4 py-4 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 md:flex-row md:gap-4">
        {/* Promo text */}
        <div className="flex items-center gap-2 text-base font-semibold md:text-lg">
          <span className="rounded bg-white/20 px-2.5 py-1 text-sm md:text-base font-bold uppercase tracking-wider">
            {t("badge")}
          </span>
          <span>{t("discount")}</span>
        </div>

        {/* Countdown */}
        <div className="flex items-center gap-1.5">
          <TimeBlock value={timeLeft.days} label={t("days")} />
          <span className="text-sm font-bold text-blue-200">:</span>
          <TimeBlock value={timeLeft.hours} label={t("hrs")} />
          <span className="text-sm font-bold text-blue-200">:</span>
          <TimeBlock value={timeLeft.minutes} label={t("min")} />
          <span className="text-sm font-bold text-blue-200">:</span>
          <TimeBlock value={timeLeft.seconds} label={t("sec")} />
        </div>

        {/* CTA */}
        <Link
          href="/pricing"
          className="rounded-full bg-white px-5 py-2 text-sm font-bold text-blue-600 transition-colors hover:bg-blue-50 md:text-base"
        >
          {t("cta")}
        </Link>
      </div>

      {/* Close button */}
      <button
        onClick={handleDismiss}
        aria-label="Dismiss promotion banner"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-white/60 transition-colors hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
