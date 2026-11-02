import Link from "next/link";
import { cn } from "@/lib/cn";
import { getGuarantee, getGuaranteeSummary } from "@/lib/guarantee";

interface GuaranteeCompactProps {
  className?: string;
  headingLevel?: "h2" | "h3";
  idSuffix?: string;
}

/** The seal in miniature: listing pages (above Buy) and the checkout review step. */
export function GuaranteeCompact({ className, headingLevel = "h2", idSuffix = "compact" }: GuaranteeCompactProps) {
  const terms = getGuarantee();
  const s = getGuaranteeSummary();
  const Heading = headingLevel;
  const headingId = `guarantee-${idSuffix}`;

  return (
    <aside aria-labelledby={headingId} className={cn("surface-paper border border-paper-ink bg-paper p-1 text-paper-ink", className)}>
      <div className="border border-paper-line p-5 sm:p-6">
        <p className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-b border-paper-ink pb-3 text-label font-bold uppercase">
          Revenue guarantee
          <span className="font-semibold text-paper-muted">Updated {s.lastUpdatedLabel}</span>
        </p>
        <Heading id={headingId} className="mt-4 font-display">
          <span className="block text-display font-extrabold">{s.amountLabel}</span>
          <span className="mt-1 block text-base font-bold">
            in revenue {s.periodLabel}, or {s.refundLabel} back
          </span>
        </Heading>
        <p className="mt-3 text-sm leading-relaxed text-paper-ink">{s.promise}</p>
        <p className="mt-4 text-label font-bold uppercase">Conditions</p>
        <ol className="mt-2 space-y-1.5 text-sm leading-snug">
          {terms.qualifyingConditions.map((c, i) => (
            <li key={c.id} className="flex gap-2.5">
              <span className="w-6 shrink-0 font-semibold">1.{i + 1}</span>
              <span>{c.title}</span>
            </li>
          ))}
        </ol>
        <Link href="/guarantee" className="mt-4 inline-block text-sm font-bold underline underline-offset-4 hover:decoration-2">
          Full terms, exclusions and claim process
        </Link>
      </div>
    </aside>
  );
}
