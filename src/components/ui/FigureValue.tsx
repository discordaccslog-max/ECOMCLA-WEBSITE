import { cn } from "@/lib/cn";
import { formatFigure, formatPeriod, formatPeriodShort } from "@/lib/format";
import type { Figure } from "@/lib/types";
import { VerifiedBadge } from "./VerifiedBadge";

interface FigureValueProps {
  label: string;
  /** The figure carries its own period; it is always rendered beside the value. */
  figure: Figure;
  size?: "sm" | "md" | "lg";
  highlight?: boolean;
  verified?: boolean;
  periodStyle?: "short" | "long";
  suffix?: string;
  className?: string;
}

/** A label, a value and the period it covers, as one unit. Render inside a <dl>. */
export function FigureValue({ label, figure, size = "md", highlight = false, verified = false, periodStyle = "long", suffix, className }: FigureValueProps) {
  const period = periodStyle === "short" ? formatPeriodShort(figure.period) : formatPeriod(figure.period);
  return (
    <div className={cn("min-w-0", className)}>
      <dt className="flex items-center gap-2 text-label font-semibold text-fg-subtle uppercase">
        {label}
        {verified ? <VerifiedBadge /> : null}
      </dt>
      <dd
        className={cn(
          "font-display font-bold tabular-nums",
          size === "sm" && "mt-1 text-lg",
          size === "md" && "mt-2 text-2xl",
          size === "lg" && "mt-2 text-display",
          highlight ? "text-accent" : "text-fg",
        )}
      >
        {formatFigure(figure)}
        {suffix ? <span className="ml-1 text-sm font-medium text-fg-muted">{suffix}</span> : null}
      </dd>
      <dd className={cn("text-fg-subtle", size === "sm" ? "mt-0.5 text-xs" : "mt-1 text-sm")}>{period}</dd>
    </div>
  );
}
