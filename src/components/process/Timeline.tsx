import type { TimedStep } from "@/lib/types";

export function Timeline({ steps, label }: { steps: TimedStep[]; label: string }) {
  return (
    <ol aria-label={label} className="relative border-l border-line-strong pl-8">
      {steps.map((s) => (
        <li key={s.title} className="relative pb-8 last:pb-0">
          <span aria-hidden className="absolute top-1.5 -left-9 size-2.5 rounded-full border-2 border-base bg-accent ring-1 ring-accent/40" />
          <p className="text-label font-semibold text-fg-subtle uppercase">{s.when}</p>
          <p className="mt-1.5 font-display text-lg font-bold">{s.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-fg-muted">{s.detail}</p>
        </li>
      ))}
    </ol>
  );
}
