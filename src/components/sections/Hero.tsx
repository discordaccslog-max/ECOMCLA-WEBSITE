import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatCurrency, formatFigure, formatMonthAxis, formatPeriod } from "@/lib/format";
import { getFeaturedListings, getPerformance } from "@/lib/listings";

const proofPoints = [
  "Every figure verified on a live screen-share",
  "Funds held in escrow until you confirm receipt",
  "60 days of hands-on support after handover",
];

function HeroListingPreview() {
  const listing = getFeaturedListings(1)[0];
  if (!listing) return null;
  const perf = getPerformance(listing);
  const months = listing.history.slice(-12);
  const max = Math.max(...months.map((m) => m.revenue));

  return (
    <figure className="relative rounded-card border border-line bg-surface p-6 shadow-lift sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-fg-muted">{listing.niche}</p>
          <p className="mt-1 font-display text-title font-bold">{listing.name}</p>
        </div>
        <StatusBadge status={listing.status} />
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-line pt-6">
        <div>
          <dt className="text-label font-semibold text-fg-subtle uppercase">Revenue / mo</dt>
          <dd className="mt-2 font-display text-3xl font-bold text-accent tabular-nums">{formatFigure(perf.revenue)}</dd>
          <dd className="mt-1 text-xs text-fg-subtle">{formatPeriod(perf.revenue.period)}</dd>
        </div>
        <div>
          <dt className="text-label font-semibold text-fg-subtle uppercase">Asking price</dt>
          <dd className="mt-2 font-display text-3xl font-bold tabular-nums">{formatCurrency(listing.askingPrice)}</dd>
          <dd className="mt-1 text-xs text-fg-subtle">{formatFigure(perf.multiple)} annual profit</dd>
        </div>
      </dl>

      <div className="mt-8" aria-hidden>
        <div className="flex h-36 items-end gap-1.5">
          {months.map((m, i) => (
            <div
              key={m.month}
              className={i === months.length - 1 ? "flex-1 rounded-t-sm bg-accent" : "flex-1 rounded-t-sm bg-fg/15"}
              style={{ height: `${(m.revenue / max) * 100}%` }}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-xs text-fg-subtle">
          <span>{formatMonthAxis(months[0].month)}</span>
          <span>{formatMonthAxis(months[months.length - 1].month)}</span>
        </div>
      </div>
      <figcaption className="mt-4 text-xs text-fg-subtle">
        Monthly revenue, last {months.length} months, as recorded. A live listing, not an illustration.
      </figcaption>
    </figure>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid mask-b-from-30%" />
      <div aria-hidden className="absolute inset-0 -z-10 glow-accent" />
      <Container className="grid items-center gap-16 pt-16 pb-section sm:pt-24 lg:grid-cols-12 lg:gap-12 lg:pt-28">
        <div className="lg:col-span-7">
          <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3.5 py-1.5 text-sm text-fg-muted">
            <span aria-hidden className="size-1.5 rounded-full bg-accent" />
            Pre-built &amp; established stores, verified
          </p>
          <h1 id="hero-title" className="font-display text-hero font-extrabold text-fg">
            Own a store that&rsquo;s already selling.
          </h1>
          <p className="mt-8 max-w-xl text-lead text-fg-muted">
            Turnkey Shopify businesses with verified revenue, ad creatives, video assets and social accounts included. Handed over set up and ready to run.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/listings" size="lg">
              Browse available businesses
            </ButtonLink>
            <ButtonLink href="/how-it-works" size="lg" variant="secondary" icon={null}>
              How it works
            </ButtonLink>
          </div>
          <ul className="mt-12 grid gap-3 text-sm text-fg-muted sm:grid-cols-3 sm:gap-6">
            {proofPoints.map((p) => (
              <li key={p} className="flex gap-2.5">
                <Icon name="check" size={18} className="mt-0.5 shrink-0 text-accent" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-5">
          <HeroListingPreview />
        </div>
      </Container>
    </section>
  );
}
