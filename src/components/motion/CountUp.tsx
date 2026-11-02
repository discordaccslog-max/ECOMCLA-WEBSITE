"use client";

import { animate, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export type CountFormat = "currency" | "currency-cents" | "integer";

const formatters: Record<CountFormat, Intl.NumberFormat> = {
  currency: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }),
  "currency-cents": new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  integer: new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }),
};

interface CountUpProps {
  value: number;
  format?: CountFormat;
  duration?: number;
  className?: string;
}

/**
 * Counts up to `value` when scrolled into view.
 * - Server and no-JS render the final value, so there is nothing to shift.
 * - An invisible copy of the final value reserves the exact width (tabular figures), so the
 *   animation never causes layout shift.
 * - Screen readers get the final value once; the animated digits are hidden from them.
 * - Reduced motion, or already on screen at hydration: shows the final value with no animation.
 */
export function CountUp({ value, format = "integer", duration = 1.8, className }: CountUpProps) {
  const fmt = formatters[format];
  const final = fmt.format(value);
  const rootRef = useRef<HTMLSpanElement>(null);
  const liveRef = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    const live = liveRef.current;
    if (!root || !live || reduce) return;

    let first = true;
    let stop: (() => void) | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (first) {
          first = false;
          if (entry.intersectionRatio > 0) {
            observer.disconnect();
            return;
          }
          live.textContent = fmt.format(0);
          return;
        }
        if (entry.intersectionRatio >= 0.5) {
          observer.disconnect();
          const controls = animate(0, value, {
            duration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (v) => {
              live.textContent = fmt.format(v);
            },
          });
          stop = () => controls.stop();
        }
      },
      { threshold: [0, 0.5] },
    );
    observer.observe(root);
    return () => {
      observer.disconnect();
      stop?.();
      live.textContent = final;
    };
  }, [value, duration, reduce, fmt, final]);

  return (
    <span ref={rootRef} className={cn("relative inline-block tabular-nums", className)}>
      <span aria-hidden className="invisible">{final}</span>
      <span ref={liveRef} aria-hidden className="absolute inset-0">{final}</span>
      <span className="sr-only">{final}</span>
    </span>
  );
}
