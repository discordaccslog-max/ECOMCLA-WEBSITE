import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ResponseTime } from "@/components/ui/ResponseTime";
import { getClaimWindowExample, getGuarantee, getGuaranteeSummary } from "@/lib/guarantee";
import type { Clause } from "@/lib/types";

const s = getGuaranteeSummary();

export const metadata: Metadata = {
  title: "Revenue guarantee — full terms",
  description: `${s.promise} Read exactly what qualifies, what doesn't, the claim window, the claim process and refund timing.`,
  alternates: { canonical: "/guarantee" },
  openGraph: { url: "/guarantee", title: `${s.amountLabel} in your first ${s.periodDays} days — EcomCla revenue guarantee` },
};

const toc = [
  { id: "commitment", label: "The commitment" },
  { id: "qualifies", label: "What qualifies" },
  { id: "excluded", label: "What doesn't" },
  { id: "claim-window", label: "Claim window" },
  { id: "claim-process", label: "Claim process" },
  { id: "evidence", label: "Evidence required" },
  { id: "refund-timing", label: "Refund timing" },
];

function ClauseList({ clauses, prefix }: { clauses: Clause[]; prefix: string }) {
  return (
    <ol className="divide-y divide-paper-line border-y border-paper-line">
      {clauses.map((c, i) => (
        <li key={c.id} className="flex gap-4 py-6">
          <span className="w-10 shrink-0 pt-0.5 font-display text-sm font-bold">
            {prefix}.{i + 1}
          </span>
          <div>
            <p className="font-display text-lg leading-snug font-bold">{c.title}</p>
            <p className="mt-2 leading-relaxed">{c.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function Clause({ id, number, title, children }: { id: string; number: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28">
      <h2 id={`${id}-title`} className="flex items-baseline gap-4 border-b border-paper-ink pb-4 font-display text-title font-extrabold">
        <span className="font-sans text-label font-bold tracking-widest">§{number}</span>
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function GuaranteePage() {
  const terms = getGuarantee();
  const example = getClaimWindowExample();

  return (
    <>
      <PageHeader
        eyebrow="Revenue guarantee · Full terms"
        title={
          <>
            {s.amountLabel} in revenue {s.periodLabel}, or {s.refundLabel} back.
          </>
        }
        lead="These are the complete terms. The summary on our homepage, listing pages and checkout is generated from this same document, so what you read there is what applies here."
      />

      <div className="surface-paper bg-paper text-paper-ink">
        <Container className="py-section-sm lg:py-section">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <nav aria-label="Guarantee terms" className="lg:col-span-3">
              <div className="lg:sticky lg:top-28">
                <p className="text-label font-bold uppercase">Contents</p>
                <ol className="mt-4 space-y-2 border-l border-paper-ink pl-4 text-sm">
                  {toc.map((t, i) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`} className="flex gap-3 hover:underline">
                        <span className="w-5 font-semibold text-paper-muted">§{i + 1}</span>
                        {t.label}
                      </a>
                    </li>
                  ))}
                </ol>
                <p className="mt-8 text-sm text-paper-muted">Last updated {s.lastUpdatedLabel}</p>
              </div>
            </nav>

            <article className="space-y-16 lg:col-span-9 lg:space-y-20">
              <Clause id="commitment" number="1" title="The commitment">
                <p className="max-w-3xl text-lead font-medium">{s.promise}</p>
                <dl className="mt-8 grid gap-6 border-t border-paper-line pt-6 sm:grid-cols-3">
                  <div>
                    <dt className="text-label font-bold text-paper-muted uppercase">Threshold</dt>
                    <dd className="mt-2 font-display text-display font-extrabold">{s.amountLabel}</dd>
                  </div>
                  <div>
                    <dt className="text-label font-bold text-paper-muted uppercase">Period</dt>
                    <dd className="mt-2 font-display text-display font-extrabold">{terms.periodDays} days</dd>
                  </div>
                  <div>
                    <dt className="text-label font-bold text-paper-muted uppercase">Refund</dt>
                    <dd className="mt-2 font-display text-title font-extrabold first-letter:uppercase">{s.refundLabel}</dd>
                  </div>
                </dl>
                <div className="mt-8 max-w-3xl space-y-3 leading-relaxed">
                  <p>
                    <strong>Revenue</strong> means: {terms.revenueDefinition}
                  </p>
                  <p>
                    <strong>The period</strong> is the {terms.periodDays} consecutive days starting on the day your first ad campaign begins delivering.
                  </p>
                </div>
              </Clause>

              <div className="grid gap-16 xl:grid-cols-2 xl:gap-12">
                <Clause id="qualifies" number="2" title="What qualifies">
                  <p className="mb-6 leading-relaxed">All of these must be met during the period for a claim to be eligible.</p>
                  <ClauseList clauses={terms.qualifyingConditions} prefix="2" />
                </Clause>
                <Clause id="excluded" number="3" title="What doesn’t qualify">
                  <p className="mb-6 leading-relaxed">A claim is not eligible, or the affected days are not counted, in these situations.</p>
                  <ClauseList clauses={terms.exclusions} prefix="3" />
                </Clause>
              </div>

              <Clause id="claim-window" number="4" title="Claim window">
                <p className="max-w-3xl text-lead font-medium">
                  Claims open the day after your {terms.periodDays}-day period ends and close {terms.claimWindowDays} days later.
                </p>
                <div className="mt-8 max-w-3xl" aria-hidden>
                  <div className="flex h-12 overflow-hidden border border-paper-ink text-label font-bold uppercase">
                    <div className="flex flex-2 items-center px-4">Days 1–{terms.periodDays} · Period</div>
                    <div className="flex flex-1 items-center border-l border-paper-ink bg-paper-ink px-4 text-paper">
                      Days {terms.periodDays + 1}–{terms.periodDays + terms.claimWindowDays} · Claims
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-paper-muted">
                  Example: campaigns go live on {example.start}. The period runs to {example.periodEnd}, and claims are accepted from {example.claimOpens} to{" "}
                  {example.claimCloses}.
                </p>
              </Clause>

              <Clause id="claim-process" number="5" title="How to claim">
                <ol className="grid gap-px border border-paper-ink bg-paper-ink sm:grid-cols-2 lg:grid-cols-5">
                  {terms.claimProcess.map((step, i) => (
                    <li key={step.title} className="bg-paper p-5">
                      <span className="font-display text-display font-extrabold">{i + 1}</span>
                      <p className="mt-3 font-display text-lg font-bold">{step.title}</p>
                      <p className="mt-2 text-sm leading-relaxed">{step.detail}</p>
                    </li>
                  ))}
                </ol>
              </Clause>

              <Clause id="evidence" number="6" title="Evidence you must provide">
                <ul className="max-w-3xl divide-y divide-paper-line border-y border-paper-line">
                  {terms.evidenceRequired.map((e) => (
                    <li key={e} className="flex gap-4 py-4 leading-relaxed">
                      <span aria-hidden className="mt-2.5 size-1.5 shrink-0 bg-paper-ink" />
                      {e}
                    </li>
                  ))}
                </ul>
              </Clause>

              <Clause id="refund-timing" number="7" title="Refund timing">
                <dl className="grid gap-6 sm:grid-cols-2">
                  <div className="border-t border-paper-ink pt-4">
                    <dt className="text-label font-bold text-paper-muted uppercase">Claim review</dt>
                    <dd className="mt-2 font-display text-title font-extrabold">Up to {terms.reviewTimeBusinessDays} business days</dd>
                    <dd className="mt-2 text-sm leading-relaxed">From the day we receive complete evidence. You get the outcome in writing.</dd>
                  </div>
                  <div className="border-t border-paper-ink pt-4">
                    <dt className="text-label font-bold text-paper-muted uppercase">Refund issued</dt>
                    <dd className="mt-2 font-display text-title font-extrabold">Within {terms.refundTimingBusinessDays} business days</dd>
                    <dd className="mt-2 text-sm leading-relaxed">Of the business assets transferring back to EcomCla, to the original payment method.</dd>
                  </div>
                </dl>
              </Clause>
            </article>
          </div>
        </Container>
      </div>

      <Container className="py-section-sm">
        <div className="flex flex-col gap-6 border-y border-line py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-title font-bold">Questions about these terms?</h2>
            <ResponseTime className="mt-3" showHours />
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/contact?topic=guarantee" variant="secondary">
              Ask about the guarantee
            </ButtonLink>
            <ButtonLink href="/listings">Browse listings</ButtonLink>
          </div>
        </div>
      </Container>
    </>
  );
}
