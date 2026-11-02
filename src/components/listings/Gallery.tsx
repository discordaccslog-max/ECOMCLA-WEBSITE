"use client";

import Image from "next/image";
import { useState } from "react";
import { Dialog } from "@/components/ui/Dialog";
import { Icon } from "@/components/ui/Icon";
import type { Screenshot } from "@/lib/types";

export function Gallery({ shots, name }: { shots: Screenshot[]; name: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const current = index !== null ? shots[index] : null;
  const step = (d: number) => setIndex((i) => (i === null ? i : (i + d + shots.length) % shots.length));

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shots.map((s, i) => (
          <li key={s.src} className={i === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : undefined}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group relative block w-full overflow-hidden rounded-card border border-line bg-surface-2 text-left"
              aria-label={`Enlarge screenshot: ${s.caption}`}
            >
              <Image
                src={s.src}
                alt={s.alt}
                width={s.width}
                height={s.height}
                sizes={i === 0 ? "(min-width: 1024px) 800px, 100vw" : "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"}
                className="h-auto w-full transition duration-500 group-hover:scale-102 motion-reduce:group-hover:scale-100"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-base/80 px-4 py-2.5 text-sm text-fg backdrop-blur">
                {s.caption}
                <Icon name="expand" size={16} className="text-fg-muted" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={current !== null} onClose={() => setIndex(null)} labelledBy="lightbox-title" closeLabel="Close screenshot" size="lg">
        {current ? (
          <div className="p-4 pt-16 sm:p-6 sm:pt-16">
            <h2 id="lightbox-title" className="sr-only">
              {name}: {current.caption}
            </h2>
            <Image src={current.src} alt={current.alt} width={current.width} height={current.height} sizes="(min-width: 1024px) 1024px, 100vw" className="h-auto w-full rounded-lg border border-line" />
            <div className="mt-4 flex items-center justify-between gap-4">
              <p className="text-sm text-fg-muted" aria-live="polite">
                {current.caption} · {index! + 1} of {shots.length}
              </p>
              <div className="flex gap-2">
                <button type="button" onClick={() => step(-1)} aria-label="Previous screenshot" className="grid size-11 place-items-center rounded-full border border-line text-fg hover:border-line-strong">
                  <Icon name="chevron-left" size={20} />
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next screenshot" className="grid size-11 place-items-center rounded-full border border-line text-fg hover:border-line-strong">
                  <Icon name="chevron-right" size={20} />
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </Dialog>
    </>
  );
}
