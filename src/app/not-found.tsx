import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { formatCurrency, formatFigure } from "@/lib/format";
import { getFeaturedListings, getPerformance } from "@/lib/listings";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  const listings = getFeaturedListings(3);
  return (
    <section aria-labelledby="nf-title" className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid mask-b-from-20%" />
      <Container className="py-section">
        <p className="font-display text-stat font-extrabold text-fg-subtle/40 tabular-nums" aria-hidden>404</p>
        <h1 id="nf-title" className="mt-4 max-w-3xl font-display text-display-lg font-extrabold">This page isn&rsquo;t listed.</h1>
        <p className="mt-6 max-w-xl text-lead text-fg-muted">
          The link may be out of date, or the business may have been withdrawn. Sold listings stay on the record in the sold archive.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/listings">Browse available businesses</ButtonLink>
          <ButtonLink href="/listings/sold" variant="secondary" icon={null}>Sold archive</ButtonLink>
          <ButtonLink href="/" variant="ghost" icon={null}>Home</ButtonLink>
        </div>

        {listings.length ? (
          <div className="mt-20 border-t border-line pt-10">
            <h2 className="text-label font-semibold text-fg-subtle uppercase">Available now</h2>
            <ul className="mt-6 divide-y divide-line">
              {listings.map((l) => {
                const p = getPerformance(l);
                return (
                  <li key={l.slug}>
                    <Link href={`/listings/${l.slug}`} className="group flex flex-wrap items-center justify-between gap-4 py-5">
                      <span>
                        <span className="block font-display text-lg font-bold group-hover:text-accent">{l.name}</span>
                        <span className="text-sm text-fg-muted">{l.niche}</span>
                      </span>
                      <span className="flex items-center gap-8 text-sm">
                        <span className="text-right">
                          <span className="block font-semibold text-fg tabular-nums">{formatFigure(p.revenue)} / mo</span>
                          <span className="text-xs text-fg-subtle">{p.revenue.period.kind === "trailing-months" ? `${p.revenue.period.months}-month average` : ""}</span>
                        </span>
                        <span className="font-display text-lg font-bold tabular-nums">{formatCurrency(l.askingPrice)}</span>
                        <Icon name="arrow-right" size={18} className="text-fg-subtle group-hover:text-accent" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
