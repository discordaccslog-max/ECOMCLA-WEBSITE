import { cn } from "@/lib/cn";
import { getEscrow } from "@/lib/process";

/** The escrow stages as a progress flow. `compact` for listing pages; full on /how-it-works. */
export function EscrowFlow({ compact = false, className }: { compact?: boolean; className?: string }) {
  const escrow = getEscrow();
  return (
    <div className={className}>
      <ol className={cn("relative grid gap-0", compact ? "sm:grid-cols-5" : "md:grid-cols-5")} aria-label="Escrow stages">
        {escrow.stages.map((stage, i) => {
          const last = i === escrow.stages.length - 1;
          return (
            <li key={stage.id} className={cn("relative flex gap-4 pb-8 last:pb-0", compact ? "sm:flex-col sm:pr-4 sm:pb-0" : "md:flex-col md:pr-6 md:pb-0")}>
              {/* connector */}
              {!last ? (
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-9 bottom-0 left-4 w-px bg-line-strong",
                    compact ? "sm:top-4 sm:right-0 sm:bottom-auto sm:left-9 sm:h-px sm:w-auto" : "md:top-4 md:right-0 md:bottom-auto md:left-9 md:h-px md:w-auto",
                  )}
                />
              ) : null}
              <span
                className={cn(
                  "relative z-10 grid size-8 shrink-0 place-items-center rounded-full border font-display text-sm font-bold",
                  last ? "border-accent bg-accent text-accent-ink" : "border-line-strong bg-base text-fg",
                )}
              >
                {i + 1}
              </span>
              <div>
                <p className={cn("font-display font-bold text-fg", compact ? "text-base" : "text-lg")}>{stage.title}</p>
                <p className={cn("mt-1 leading-relaxed text-fg-muted", compact ? "text-sm" : "text-sm md:text-base")}>{stage.detail}</p>
                {!compact ? <p className="mt-2 text-xs font-semibold text-fg-subtle uppercase tracking-wider">{stage.owner}</p> : null}
              </div>
            </li>
          );
        })}
      </ol>
      <p className="mt-6 text-sm text-fg-subtle">
        Escrow provider: <span className="text-fg-muted">{escrow.provider.name}</span>. {escrow.provider.description}
      </p>
    </div>
  );
}
