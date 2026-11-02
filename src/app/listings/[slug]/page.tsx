import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GuaranteeCompact } from "@/components/guarantee/GuaranteeCompact";
import { ChartPanel } from "@/components/listings/charts/ChartPanel";
import { Gallery } from "@/components/listings/Gallery";
import { PurchaseActions } from "@/components/listings/PurchaseActions";
import { StickyBuyBar } from "@/components/listings/StickyBuyBar";
import { EscrowFlow } from "@/components/process/EscrowFlow";
import { Timeline } from "@/components/process/Timeline";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FigureValue } from "@/components/ui/FigureValue";
import { Icon } from "@/components/ui/Icon";
import { ResponseTime } from "@/components/ui/ResponseTime";
import { Eyebrow } from "@/components/ui/Section";
import { StatusBadge, TypeBadge } from "@/components/ui/StatusBadge";
import { getResponseTime, getSupportHoursLine } from "@/lib/company";
import { formatCurrency, formatDate, formatMonth, formatPeriod } from "@/lib/format";
import { getAgeMonths, getListing, getListingSlugs, getPerformance } from "@/lib/listings";
import { getBuyerProtection, getDueDiligenceItems, getEscrow, getFirstFortyEightHours } from "@/lib/process";

interface Props {
  params: Promise<{ slug: string }>;
}

// Every listing is prerendered via generateStaticParams, so navigation fetches a static
// payload; there is no dynamic data to stream behind a fallback.
export const instant = false;

export function generateStaticParams() {
  return getListingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const l = getListing(slug);
  if (!l) return { title: "Listing not found" };
  const p = getPerformance(l);
  const description = `${l.niche} Shopify business. ${formatCurrency(p.revenue.value)} average monthly revenue (${formatPeriod(p.revenue.period).toLowerCase()}). Asking ${formatCurrency(l.askingPrice)}.`;
  return {
    title: `${l.name} — ${l.status === "sold" ? "Sold" : "For sale"}`,
    description,
    alternates: { canonical: `/listings/${l.slug}` },
    openGraph: { url: `/listings/${l.slug}`, title: `${l.name} — ${l.tagline}`, description },
  };
}

function SectionBlock({ id, title, eyebrow, children, aside }: { id: string; title: string; eyebrow?: string; children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 border-t border-line pt-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          {eyebrow ? <Eyebrow className="mb-3">{eyebrow}</Eyebrow> : null}
          <h2 id={`${id}-title`} className="font-display text-title font-bold">{title}</h2>
        </div>
        {aside}
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default async function ListingPage({ params }: Props) {
  const { slug } = await params;
  const l = getListing(slug);
  if (!l) notFound();

  const p = getPerformance(l);
  const age = getAgeMonths(l);
  const rt = getResponseTime();
  const escrow = getEscrow();
  const protection = getBuyerProtection();
  const sold = l.status === "sold";
  const first = l.history[0];
  const declines = l.history.filter((m, i) => i > 0 && m.revenue < l.history[i - 1].revenue).length;

  return (
    <>
      <Container className="pt-10 sm:pt-14">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-fg-muted">
            <li><Link href="/listings" className="hover:text-fg">Listings</Link></li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-fg">{l.name}</li>
          </ol>
        </nav>
      </Container>

      <Container className={sold ? "pt-8 pb-section" : "pt-8 pb-32 lg:pb-40"}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Main column */}
          <div className="min-w-0 space-y-16 lg:col-span-8">
            <header>
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={l.status} />
                <TypeBadge type={l.type} />
                <span className="text-sm text-fg-muted">{l.niche} · {l.platform}</span>
              </div>
              <h1 className="mt-5 font-display text-display-lg font-extrabold">{l.name}</h1>
              <p className="mt-3 text-lead text-fg-muted">{l.tagline}</p>
              <p className="mt-6 max-w-2xl leading-relaxed text-fg-muted">{l.summary}</p>
            </header>

            <section aria-labelledby="figures-title">
              <h2 id="figures-title" className="sr-only">Performance figures</h2>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-8 rounded-card border border-line bg-surface p-6 sm:grid-cols-3 sm:p-8">
                <FigureValue label="Revenue / mo" figure={p.revenue} size="md" highlight verified />
                <FigureValue label="Profit / mo" figure={p.profit} size="md" verified />
                <FigureValue label="Profit margin" figure={p.margin} size="md" />
                <FigureValue label="Ad spend / mo" figure={p.adSpend} size="md" />
                <FigureValue label="Revenue per $1 of ads" figure={p.roas} size="md" />
                <FigureValue label="Lifetime revenue" figure={p.lifetimeRevenue} size="md" />
              </dl>
              <p className="mt-3 flex items-start gap-2 text-sm text-fg-subtle">
                <Icon name="verified" size={16} className="mt-0.5 shrink-0" />
                <span>
                  Verified {formatDate(l.verification.verifiedOn)} by {l.verification.methods.join(", ").toLowerCase()}.{" "}
                  <Link href="/how-it-works#verification" className="underline underline-offset-4 hover:text-fg">How we verify</Link>
                </span>
              </p>
            </section>

            <SectionBlock id="revenue" eyebrow="Performance" title="Month-by-month revenue">
              <ChartPanel
                id="revenue-chart"
                kind="revenue"
                records={l.history}
                title={`Revenue and profit, ${formatMonth(first.month, "short")} – ${formatMonth(l.history[l.history.length - 1].month, "short")}`}
                description={`Every month since launch, as recorded. Revenue fell month-on-month ${declines} ${declines === 1 ? "time" : "times"} in this period.`}
              />
            </SectionBlock>

            <SectionBlock id="ad-spend" title="Ad spend history">
              <ChartPanel
                id="ad-spend-chart"
                kind="adSpend"
                records={l.history}
                title="Monthly ad spend"
                description={`Average ${formatCurrency(p.adSpend.value)} a month, ${formatPeriod(p.adSpend.period).toLowerCase()}. From the ad platforms' own exports.`}
              />
            </SectionBlock>

            <SectionBlock id="traffic" title="Traffic by source">
              <p className="-mt-4 mb-6 text-sm text-fg-subtle">Share of sessions, {formatPeriod(l.traffic.period).toLowerCase()}</p>
              <ul className="space-y-4">
                {l.traffic.sources.map((s) => (
                  <li key={s.source}>
                    <div className="flex items-baseline justify-between text-sm">
                      <span className="text-fg">{s.source}</span>
                      <span className="font-semibold text-fg tabular-nums">{s.share}%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-3" aria-hidden>
                      <div className="h-full rounded-full bg-fg-muted" style={{ width: `${s.share}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </SectionBlock>

            <SectionBlock id="included" title="What's included, and what isn't">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-card border border-line bg-surface p-6">
                  <h3 className="flex items-center gap-2 font-display text-lg font-bold">
                    <Icon name="check" size={20} className="text-accent" /> Included
                  </h3>
                  <div className="mt-5 space-y-5">
                    {l.included.map((g) => (
                      <div key={g.group}>
                        <p className="text-label font-semibold text-fg-subtle uppercase">{g.group}</p>
                        <ul className="mt-2 space-y-2 text-sm text-fg">
                          {g.items.map((item) => (
                            <li key={item} className="flex gap-2.5">
                              <Icon name="check" size={16} className="mt-0.5 shrink-0 text-fg-subtle" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-card border border-line bg-surface p-6">
                  <h3 className="flex items-center gap-2 font-display text-lg font-bold">
                    <Icon name="x" size={20} className="text-fg-muted" /> Not included
                  </h3>
                  <ul className="mt-5 space-y-3 text-sm text-fg">
                    {l.excluded.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <Icon name="minus" size={16} className="mt-0.5 shrink-0 text-fg-subtle" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <TextLink href="/whats-included" className="mt-6 text-sm text-fg-muted hover:text-fg">
                    Our standard inclusions <Icon name="arrow-right" size={14} />
                  </TextLink>
                </div>
              </div>
            </SectionBlock>

            <SectionBlock id="screenshots" title="Screenshots">
              <Gallery shots={l.screenshots} name={l.name} />
            </SectionBlock>

            <SectionBlock id="details" title="Business details">
              <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  ["Business age", `${age} months (since ${formatMonth(l.launched)})`],
                  ["Date listed", formatDate(l.dateListed)],
                  ["Previous owners", l.previousOwners === 0 ? "None (built by EcomCla)" : String(l.previousOwners)],
                  ["Time to run", `About ${l.hoursPerWeek} hours a week (seller's figure)`],
                  ["Platform", l.platform],
                  ["Business type", l.type === "pre-built" ? "Pre-built" : "Established"],
                ].map(([k, v]) => (
                  <div key={k} className="border-t border-line pt-4">
                    <dt className="text-label font-semibold text-fg-subtle uppercase">{k}</dt>
                    <dd className="mt-2 text-fg">{v}</dd>
                  </div>
                ))}
                <div className="border-t border-line pt-4 sm:col-span-2 lg:col-span-3">
                  <dt className="text-label font-semibold text-fg-subtle uppercase">Why it&rsquo;s for sale</dt>
                  <dd className="mt-2 max-w-2xl leading-relaxed text-fg">{l.sellerReason}</dd>
                </div>
              </dl>
            </SectionBlock>

            {!sold ? (
              <SectionBlock id="first-48-hours" title="Your first 48 hours after purchase">
                <Timeline steps={getFirstFortyEightHours()} label="First 48 hours after purchase" />
              </SectionBlock>
            ) : null}

            <SectionBlock
              id="escrow"
              title="How your payment is protected"
              aside={<TextLink href="/how-it-works#escrow" className="text-sm text-fg-muted hover:text-fg">Escrow in detail <Icon name="arrow-right" size={14} /></TextLink>}
            >
              <EscrowFlow compact />
              <div className="mt-8 rounded-card border border-line bg-surface p-6">
                <p className="font-display text-lg font-bold">Transfer protection</p>
                <p className="mt-2 leading-relaxed text-fg-muted">{protection.summary}</p>
                <TextLink href="/buyer-protection" className="mt-4 text-sm">
                  Read the buyer protection terms <Icon name="arrow-right" size={14} />
                </TextLink>
              </div>
            </SectionBlock>

            <SectionBlock id="due-diligence" title="What you can inspect before you commit">
              <ul className="grid gap-4 sm:grid-cols-2">
                {getDueDiligenceItems().map((d) => (
                  <li key={d.title} className="rounded-card border border-line p-5">
                    <p className="font-display font-bold">{d.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{d.detail}</p>
                  </li>
                ))}
              </ul>
            </SectionBlock>
          </div>

          {/* Purchase panel */}
          <aside id="purchase" aria-label="Purchase" className="scroll-mt-24 lg:col-span-4 lg:col-start-9 lg:row-start-1">
            <div className="space-y-5">
              <div className="rounded-card border border-line bg-surface p-6">
                <p className="text-label font-semibold text-fg-subtle uppercase">{sold ? "Sold for" : "Asking price"}</p>
                <p className="mt-2 font-display text-display font-extrabold tabular-nums">
                  {formatCurrency(sold && l.sale ? l.sale.salePrice : l.askingPrice)}
                </p>
                <p className="mt-1 text-sm text-fg-subtle">
                  {sold && l.sale
                    ? `Sold ${formatDate(l.sale.saleDate)} · asking was ${formatCurrency(l.askingPrice)}`
                    : `${p.multiple.value.toFixed(1)}× annual profit · ${formatPeriod(p.multiple.period).toLowerCase()}`}
                </p>
                <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-line pt-5 text-sm">
                  <div>
                    <dt className="text-fg-subtle">Listed</dt>
                    <dd className="mt-0.5 text-fg">{formatDate(l.dateListed)}</dd>
                  </div>
                  <div>
                    <dt className="text-fg-subtle">Previous owners</dt>
                    <dd className="mt-0.5 text-fg">{l.previousOwners}</dd>
                  </div>
                </dl>
              </div>

              {sold ? (
                <div className="rounded-card border border-line p-6">
                  <p className="font-display text-lg font-bold">This business has been sold</p>
                  <p className="mt-2 text-sm text-fg-muted">The listing stays up so its figures remain on the record.</p>
                  <ButtonLink href="/listings" className="mt-5 w-full">Browse available businesses</ButtonLink>
                </div>
              ) : (
                <>
                  <GuaranteeCompact idSuffix="listing" />
                  <PurchaseActions
                    slug={l.slug}
                    name={l.name}
                    priceLabel={formatCurrency(l.askingPrice)}
                    escrowLine={`Held by ${escrow.provider.name}. Released to the seller only after you confirm receipt (${escrow.inspectionPeriodDays}-day inspection).`}
                    checkoutGuarantee={<GuaranteeCompact idSuffix="checkout" headingLevel="h3" />}
                    responseTime={rt.value}
                    supportHours={getSupportHoursLine()}
                  />
                  <ul className="space-y-2 text-sm text-fg-muted">
                    <li className="flex gap-2"><Icon name="lock" size={16} className="mt-0.5 shrink-0 text-fg-subtle" />Funds held in escrow until you confirm receipt</li>
                    <li className="flex gap-2">
                      <Icon name="shield" size={16} className="mt-0.5 shrink-0 text-fg-subtle" />
                      <Link href="/buyer-protection" className="underline decoration-line-strong underline-offset-4 hover:text-fg">Transfer protection</Link>&nbsp;if assets don&rsquo;t arrive as described
                    </li>
                  </ul>
                  <ResponseTime />
                </>
              )}
            </div>
          </aside>
        </div>
      </Container>

      {!sold ? <StickyBuyBar name={l.name} priceLabel={formatCurrency(l.askingPrice)} /> : null}
    </>
  );
}
