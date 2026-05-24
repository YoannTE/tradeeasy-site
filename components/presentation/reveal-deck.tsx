"use client";

import { useEffect, useRef } from "react";
import type { RevealApi } from "reveal.js";
import { SlidesIntro } from "./slides-intro";
import { SlidesProduct } from "./slides-product";
import { SlidesConversion } from "./slides-conversion";

export function RevealDeck() {
  const deckRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let deck: RevealApi | null = null;
    let cancelled = false;

    (async () => {
      const Reveal = (await import("reveal.js")).default;
      if (cancelled || !deckRef.current) return;
      deck = new Reveal(deckRef.current, {
        hash: true,
        controls: true,
        progress: true,
        slideNumber: "c/t",
        center: false,
        transition: "slide",
        width: 1920,
        height: 1080,
        margin: 0.04,
        minScale: 0.2,
        maxScale: 2,
      });
      await deck.initialize();
      (window as unknown as { Reveal: typeof deck }).Reveal = deck;
    })();

    return () => {
      cancelled = true;
      try {
        deck?.destroy();
      } catch {}
    };
  }, []);

  return (
    <div className="reveal" ref={deckRef}>
      <div className="slides">
        <SlidesIntro />
        <SlidesProduct />
        <SlidesConversion />
      </div>
    </div>
  );
}
