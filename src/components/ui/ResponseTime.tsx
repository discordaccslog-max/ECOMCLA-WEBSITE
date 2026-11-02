import { getResponseTime, getSupportHoursLine } from "@/lib/company";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

/** The average first-reply time, with its period, shown beside every contact CTA. */
export function ResponseTime({ className, showHours = false, tone = "dark" }: { className?: string; showHours?: boolean; tone?: "dark" | "paper" }) {
  const rt = getResponseTime();
  return (
    <p className={cn("flex flex-wrap items-center gap-x-2 gap-y-1 text-sm", tone === "dark" ? "text-fg-muted" : "text-paper-muted", className)}>
      <Icon name="clock" size={16} className={tone === "dark" ? "text-fg-subtle" : "text-paper-muted"} />
      <span>
        Average first reply <strong className={cn("font-semibold", tone === "dark" ? "text-fg" : "text-paper-ink")}>{rt.value}</strong>
      </span>
      <span className={tone === "dark" ? "text-fg-subtle" : "text-paper-muted"}>· {rt.period.toLowerCase()}</span>
      {showHours ? <span className={cn("basis-full", tone === "dark" ? "text-fg-subtle" : "text-paper-muted")}>Support hours: {getSupportHoursLine()}</span> : null}
    </p>
  );
}
