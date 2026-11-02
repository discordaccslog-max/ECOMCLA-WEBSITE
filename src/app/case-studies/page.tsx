import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FigureValue } from "@/components/ui/FigureValue";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { SampleTag } from "@/components/ui/SampleTag";
import { getCaseStudies, getCaseStudyHighlights } from "@/lib/case-studies";
import { formatCurrency, formatMonth, formatMonthAxis } from "@/lib/format";

export const metadata: Metadata = {
  title: "Case studies",
  description: "Three buyers, from purchase through their first months, including what was hard and one setback that had to be resolved.",
  alternates: { canonical: "/case-studies" },
  openGraph: { url: "/case-studies", title: "Case studies — EcomCla" },
};

export default function CaseStudiesPage() {
  const studies = getCaseStudies();

  return (
    <>
      <PageHeader
        eyebrow="Case studies"
        title="Three buyers. Their first months, including the hard parts."
        lead="Month-by-month figures from each buyer's store after handover, what they struggled with, and in one case a setback that cost real revenue before it was resolved."
      >
        <nav aria-label="Case studies">
          <ul className="flex flex-wrap gap-2">
            {studies.map((c) => (
              <li key={c.slug}>
                <a href={`#${c.slug}`} className="inline-flex rounded-full border border-line-strong px-4 py-2 text-sm text-fg-muted transition hover:border-fg-subtle hover:text-fg">
                  {c.buyerName} · {c.businessName}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      {studies.map((c, idx) => {
        const h = getCaseStudyHighlights(c);
        const max = Math.max(...c.months.map((m) => m.revenue));
        return (
          <article key={c.slug} id={c.slug} aria-labelledby={`${c.slug}-title`} className={idx % 2 ? "scroll-mt-20 border-y border-line bg-surface py-section" : "scroll-mt-20 py-section"}>
            <Container>
              <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                <header className="lg:col-span-5">
                  <p className="text-label font-semibold text-fg-subtle uppercase">Case study {idx + 1} of {studies.length}</p>
                  <h2 id={`${c.slug}-title`} className="mt-5 font-display text-display font-extrabold">{c.headline}</h2>
                  <div className="mt-8 flex items-center gap-4">
                    <Image src={c.buyerPhoto.src} alt={`Portrait of ${c.buyerName}`} width={64} height={64} className="size-16 rounded-full" />
                    <div>
                      <p className="font-semibold">
                        {c.buyerName} <SampleTag sample={c.sample} />
                      </p>
                      <p className="text-sm text-fg-muted">{c.buyerBackground}</p>
                    </div>
                  </div>
                  <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-line pt-6 text-sm">
                    <div>
                      <dt className="text-fg-subtle">Business</dt>
                      <dd className="mt-1 font-semibold">
                        {c.listingSlug ? <Link href={`/listings/${c.listingSlug}`} className="underline decoration-line-strong underline-offset-4 hover:text-accent">{c.businessName}</Link> : c.businessName}
                      </dd>
                      <dd className="text-fg-muted">{c.niche}</dd>
                    </div>
                    <div>
                      <dt className="text-fg-subtle">Bought</dt>
                      <dd className="mt-1 font-semibold">{formatMonth(c.purchasedMonth)}</dd>
                      <dd className="text-fg-muted tabular-nums">{formatCurrency(c.purchasePrice)}</dd>
                    </div>
                  </dl>
                </header>

                <div className="space-y-12 lg:col-span-7">
                  <p className="text-lead text-fg-muted">{c.summary}</p>

                  <figure className="rounded-card border border-line bg-base p-6 sm:p-8">
                    <dl className="grid grid-cols-2 gap-6">
                      <FigureValue label="First month revenue" figure={h.first} />
                      <FigureValue label="Latest month revenue" figure={h.latest} highlight />
                    </dl>
                    <div className="mt-8 overflow-x-auto">
                      <table className="w-full min-w-md text-left text-sm">
                        <caption className="sr-only">{c.businessName}: revenue, profit and ad spend by month after purchase</caption>
                        <thead className="text-label text-fg-subtle uppercase">
                          <tr>
                            <th scope="col" className="pb-3 font-semibold">Month</th>
                            <th scope="col" className="w-2/5 pb-3 font-semibold">Revenue</th>
                            <th scope="col" className="pb-3 text-right font-semibold">Profit</th>
                            <th scope="col" className="pb-3 text-right font-semibold">Ad spend</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-line tabular-nums">
                          {c.months.map((m) => (
                            <tr key={m.month}>
                              <th scope="row" className="py-3 pr-4 font-normal text-fg-muted">{formatMonthAxis(m.month)}</th>
                              <td className="py-3 pr-4">
                                <div className="flex items-center gap-3">
                                  <span className="h-2 rounded-full bg-accent" style={{ width: `${(m.revenue / max) * 70}%` }} aria-hidden />
                                  <span className="text-fg">{formatCurrency(m.revenue)}</span>
                                </div>
                              </td>
                              <td className="py-3 text-right text-fg">{formatCurrency(m.profit)}</td>
                              <td className="py-3 text-right text-fg-muted">{formatCurrency(m.adSpend)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </figure>

                  {c.sections.slice(0, 2).map((s) => (
                    <section key={s.heading}>
                      <h3 className="font-display text-title font-bold">{s.heading}</h3>
                      {s.body.map((p) => <p key={p} className="mt-4 leading-relaxed text-fg-muted">{p}</p>)}
                    </section>
                  ))}

                  {c.setback ? (
                    <section aria-labelledby={`${c.slug}-setback`} className="rounded-card border border-danger/30 bg-danger/5 p-6 sm:p-8">
                      <p className="flex items-center gap-2 text-label font-bold text-danger uppercase"><Icon name="alert" size={16} /> Setback</p>
                      <h3 id={`${c.slug}-setback`} className="mt-3 font-display text-title font-bold">{c.setback.title}</h3>
                      <dl className="mt-6 space-y-5">
                        <div><dt className="font-semibold text-fg">What happened</dt><dd className="mt-1 leading-relaxed text-fg-muted">{c.setback.whatHappened}</dd></div>
                        <div><dt className="font-semibold text-fg">How it was resolved</dt><dd className="mt-1 leading-relaxed text-fg-muted">{c.setback.resolution}</dd></div>
                        <div><dt className="font-semibold text-fg">What it cost</dt><dd className="mt-1 leading-relaxed text-fg-muted">{c.setback.cost}</dd></div>
                      </dl>
                    </section>
                  ) : null}

                  <section>
                    <h3 className="font-display text-title font-bold">What was hard</h3>
                    <ul className="mt-5 space-y-4">
                      {c.hardParts.map((p) => (
                        <li key={p} className="flex gap-3 leading-relaxed text-fg-muted">
                          <Icon name="minus" size={18} className="mt-1 shrink-0 text-fg-subtle" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </section>

                  {c.sections.slice(2).map((s) => (
                    <section key={s.heading}>
                      <h3 className="font-display text-title font-bold">{s.heading}</h3>
                      {s.body.map((p) => <p key={p} className="mt-4 leading-relaxed text-fg-muted">{p}</p>)}
                    </section>
                  ))}

                  <blockquote className="border-l-2 border-accent pl-6">
                    <p className="font-display text-title leading-snug font-semibold">&ldquo;{c.quote}&rdquo;</p>
                    <footer className="mt-4 text-sm text-fg-muted">{c.buyerName}, owner of {c.businessName}</footer>
                  </blockquote>
                </div>
              </div>
            </Container>
          </article>
        );
      })}

      <Container className="py-section-sm">
        <div className="flex flex-col gap-6 border-y border-line py-10 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-fg-muted">Results depend on how a business is run after handover. These are individual accounts, not a forecast. See our <Link href="/earnings-disclaimer" className="text-fg underline underline-offset-4">earnings disclaimer</Link>.</p>
          <ButtonLink href="/listings">Browse listings</ButtonLink>
        </div>
      </Container>
    </>
  );
}
