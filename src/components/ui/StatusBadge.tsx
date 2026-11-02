import { cn } from "@/lib/cn";
import type { ListingStatus, ListingType } from "@/lib/types";

export function StatusBadge({ status, className }: { status: ListingStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold",
        status === "available" ? "border-accent/30 text-accent" : "border-line-strong text-fg-muted",
        className,
      )}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", status === "available" ? "bg-accent" : "bg-fg-subtle")} />
      {status === "available" ? "Available" : "Sold"}
    </span>
  );
}

export function TypeBadge({ type }: { type: ListingType }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line-strong px-2.5 py-1 text-xs font-semibold text-fg-muted">
      {type === "pre-built" ? "Pre-built" : "Established"}
    </span>
  );
}
