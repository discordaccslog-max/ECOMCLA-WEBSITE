import Link from "next/link";
import { CountUp } from "@/components/motion/CountUp";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { getGuarantee, getGuaranteeSummary } from "@/lib/guarantee";
import { EmbossedSeal } from "./EmbossedSeal";

/**
 * The flagship. The only paper surface on the site: a written commitment set
 * like a contract clause. Everything here renders from guarantee.json.
 */
export function GuaranteeSeal() {
  const terms = getGuarantee();
  const s = getGuaranteeSummary();

  return (
    <section aria-labelledby="guarantee-title" className="surface-paper relative isolate overflow-hidden bg-paper text-paper-ink">
      <div aria-hidden className="absolute inset-0 -z-10 bg-paper-grain" />
      <Container className="py-section">
        <div className="border border-paper-ink p-1.5 shadow-paper sm:p-2">
          <div className="relative border border-paper-line px-5 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-20">
            <EmbossedSeal
              year={terms.lastUpdated.slice(0, 4)}
              className="pointer-events-none absolute top-24 right-12 hidden size-44 text-paper-line lg:block xl:size-52"
            />

            <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-paper-ink pb-5">
              <p className="text-label font-bold uppercase">EcomCla · Revenue guarantee</p>
              <p className="text-label font-semibold text-paper-muted uppercase">Written terms · Updated {s.lastUpdatedLabel}</p>
            </header>

            <div className="pt-12 lg:pt-16 lg:pr-64">
              <p className="text-label font-semibold text-paper-muted uppercase">Minimum first-month revenue</p>
              <h2 id="guarantee-title" className="mt-5 flex flex-wrap items-end gap-x-6 gap-y-3 font-display">
                <span className="text-seal font-extrabold">
                  <CountUp value={s.amount} format="currency" duration={1.6} />
                </span>
                <span className="pb-1 text-title font-bold sm:pb-2 lg:pb-3">
                  in revenue
                  <br />
                  {s.periodLabel}
                </span>
              </h2>
              <p className="mt-8 max-w-3xl text-lead font-medium text-paper-ink">{s.promise}</p>
            </div>

            <div className="mt-14 lg:mt-16">
              <h3 className="flex items-center gap-4 font-sans text-label font-bold uppercase">
                Qualifying conditions
                <span aria-hidden className="h-px flex-1 bg-paper-ink" />
              </h3>
              <ol className="mt-2 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
                {terms.qualifyingConditions.map((c, i) => (
                  <li key={c.id} className="flex gap-4 border-b border-paper-line py-6">
                    <span className="w-9 shrink-0 pt-0.5 font-display text-sm font-bold">1.{i + 1}</span>
                    <div>
                      <p className="font-display text-lg leading-snug font-bold">{c.title}</p>
                      <p className="mt-2 text-base leading-relaxed text-paper-ink">{c.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <footer className="mt-12 grid gap-8 border-t border-paper-ink pt-8 md:grid-cols-12 md:items-end">
              <dl className="grid grid-cols-2 gap-6 md:col-span-7">
                <div>
                  <dt className="text-label font-semibold text-paper-muted uppercase">Refund</dt>
                  <dd className="mt-2 font-display text-lg font-bold first-letter:uppercase">{s.refundLabel}</dd>
                </div>
                <div>
                  <dt className="text-label font-semibold text-paper-muted uppercase">Claim window</dt>
                  <dd className="mt-2 font-display text-lg font-bold">{s.claimWindowLabel}</dd>
                </div>
              </dl>
              <div className="md:col-span-5 md:text-right">
                <Link
                  href="/guarantee"
                  className="group inline-flex items-center gap-2 font-display text-lg font-bold underline decoration-1 underline-offset-8 hover:decoration-2"
                >
                  Read the full terms and exclusions
                  <Icon name="arrow-right" size={20} className="transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none" />
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </Container>
    </section>
  );
}
