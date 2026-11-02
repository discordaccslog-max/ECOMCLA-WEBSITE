"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Appears only while the purchase panel (#purchase) is off screen. Its link
 * returns to the panel, so the compact guarantee is always seen above Buy.
 */
export function StickyBuyBar({ name, priceLabel }: { name: string; priceLabel: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("purchase");
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), { rootMargin: "0px 0px -20% 0px" });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      inert={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-line bg-base/90 backdrop-blur-xl transition duration-300 ease-out motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
      )}
    >
      <div className="mx-auto flex max-w-site items-center justify-between gap-4 px-gutter py-3">
        <div className="min-w-0">
          <p className="truncate text-xs text-fg-subtle">{name} · Asking price</p>
          <p className="font-display text-lg font-bold tabular-nums">{priceLabel}</p>
        </div>
        <a href="#purchase" className="inline-flex h-11 shrink-0 items-center rounded-full bg-accent px-5 text-sm font-semibold text-accent-ink transition hover:bg-accent-strong">
          Review &amp; buy
        </a>
      </div>
    </div>
  );
}
