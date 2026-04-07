"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "./language-switcher";

interface NavbarClientProps {
  user: { id: number | string; email: string } | null;
}

export function NavbarClient({ user }: NavbarClientProps) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: t("features"), href: "/#features" },
    { label: t("pricing"), href: "/pricing" },
    { label: t("videos"), href: "/videos" },
    { label: t("guides"), href: "/guides" },
    { label: t("contact"), href: "/contact" },
  ];

  const ctaLabel = user ? t("dashboard") : t("startTrial");
  const ctaHref = user ? "/dashboard" : "/pricing";

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Logo size="sm" />

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA + Language */}
        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <Button nativeButton={false} render={<Link href={ctaHref} />}>
            {ctaLabel}
          </Button>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <button
                  aria-label={t("menuLabel")}
                  className="text-zinc-400 transition-colors hover:text-white"
                />
              }
            >
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="right" className="border-zinc-800 bg-zinc-950">
              <SheetTitle className="sr-only">{t("menuLabel")}</SheetTitle>
              <nav className="mt-8 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <SheetClose
                    key={link.href}
                    render={
                      <Link
                        href={link.href}
                        className="text-lg text-zinc-400 transition-colors hover:text-white"
                      />
                    }
                  >
                    {link.label}
                  </SheetClose>
                ))}
                <div className="mt-2">
                  <LanguageSwitcher />
                </div>
                <SheetClose
                  render={
                    <Button
                      className="mt-4"
                      nativeButton={false}
                      render={<Link href={ctaHref} />}
                    />
                  }
                >
                  {ctaLabel}
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
