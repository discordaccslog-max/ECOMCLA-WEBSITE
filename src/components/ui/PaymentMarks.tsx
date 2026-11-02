import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

/**
 * Monochrome accepted-payment marks and a "Powered by Stripe" badge.
 * Simplified wordmarks; swap for the official brand assets if your
 * agreements require them.
 */
export function PaymentMarks({ className, tone = "dark" }: { className?: string; tone?: "dark" | "paper" }) {
  const chip = cn(
    "flex h-8 min-w-12 items-center justify-center rounded-md border px-2.5",
    tone === "dark" ? "border-line-strong text-fg-muted" : "border-paper-line text-paper-muted",
  );
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className="sr-only">Accepted payment methods: Visa, Mastercard, American Express, Apple Pay, Google Pay. Payments processed by Stripe.</span>
      <span aria-hidden className={chip}>
        <span className="font-display text-sm font-extrabold tracking-tight italic">VISA</span>
      </span>
      <span aria-hidden className={chip}>
        <svg width="26" height="16" viewBox="0 0 26 16" fill="none">
          <circle cx="9" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="17" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </span>
      <span aria-hidden className={chip}>
        <span className="text-label font-bold tracking-normal">AMEX</span>
      </span>
      <span aria-hidden className={chip}>
        <span className="text-xs font-semibold">Apple Pay</span>
      </span>
      <span aria-hidden className={chip}>
        <span className="text-xs font-semibold">G Pay</span>
      </span>
      <StripeBadge tone={tone} />
    </div>
  );
}

export function StripeBadge({ tone = "dark", className }: { tone?: "dark" | "paper"; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex h-8 items-center gap-1.5 rounded-md border px-3 text-xs",
        tone === "dark" ? "border-line-strong text-fg-muted" : "border-paper-line text-paper-muted",
        className,
      )}
    >
      <Icon name="lock" size={14} />
      Powered by <span className="font-display text-sm font-extrabold tracking-tight">stripe</span>
    </span>
  );
}
