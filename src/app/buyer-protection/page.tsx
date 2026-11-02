import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { ResponseTime } from "@/components/ui/ResponseTime";
import { formatDate } from "@/lib/format";
import { getBuyerProtection, getEscrow } from "@/lib/process";

export const metadata: Metadata = {
  title: "Buyer protection",
  description: "What happens if business assets don't transfer as described: the actual terms, remedies and how to raise an issue.",
  alternates: { canonical: "/buyer-protection" },
  openGraph: { url: "/buyer-protection", title: "Buyer protection — EcomCla" },
};

function TermList({ items, icon }: { items: { id: string; title: string; detail: string }[]; icon: "check" | "minus" }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((c) => (
        <li key={c.id} className="flex gap-4 py-5">
          <Icon name={icon} size={18} className={icon === "check" ? "mt-1 shrink-0 text-accent" : "mt-1 shrink-0 text-fg-subtle"} />
          <div>
            <p className="font-display text-lg font-bold">{c.title}</p>
            <p className="mt-1.5 leading-relaxed text-fg-muted">{c.detail}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function BuyerProtectionPage() {
  const bp = getBuyerProtection();
  const escrow = getEscrow();

  return (
    <>
      <PageHeader eyebrow="Buyer protection" title="If an asset doesn’t arrive as described, you don’t pay for it." lead={bp.summary}>
        <dl className="grid max-w-3xl gap-6 border-t border-line pt-6 sm:grid-cols-3">
          <div>
            <dt className="text-label font-semibold text-fg-subtle uppercase">Transfer window</dt>
            <dd className="mt-2 font-display text-title font-bold">{bp.transferWindowDays} days</dd>
          </div>
          <div>
            <dt className="text-label font-semibold text-fg-subtle uppercase">Inspection period</dt>
            <dd className="mt-2 font-display text-title font-bold">{escrow.inspectionPeriodDays} days</dd>
          </div>
          <div>
            <dt className="text-label font-semibold text-fg-subtle uppercase">Funds held by</dt>
            <dd className="mt-2 font-display text-title font-bold">{escrow.provider.name}</dd>
          </div>
        </dl>
      </PageHeader>

      <Container className="py-section-sm lg:py-section">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-12">
          <section aria-labelledby="covered-title">
            <h2 id="covered-title" className="font-display text-display font-extrabold">What&rsquo;s covered</h2>
            <div className="mt-8"><TermList items={bp.covered} icon="check" /></div>
          </section>
          <section aria-labelledby="not-covered-title">
            <h2 id="not-covered-title" className="font-display text-display font-extrabold">What isn&rsquo;t</h2>
            <div className="mt-8"><TermList items={bp.notCovered} icon="minus" /></div>
          </section>
        </div>

        <section aria-labelledby="remedies-title" className="mt-section-sm">
          <h2 id="remedies-title" className="font-display text-display font-extrabold">What we do about it</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {bp.remedies.map((r, i) => (
              <li key={r.title} className="rounded-card border border-line bg-surface p-7">
                <span className="font-display text-display font-extrabold text-fg-subtle/60">{i + 1}</span>
                <p className="mt-4 font-display text-lg font-bold">{r.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{r.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="raise-title" className="mt-section-sm grid gap-10 rounded-card border border-line p-8 sm:p-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="raise-title" className="font-display text-display font-extrabold">How to raise an issue</h2>
            <ResponseTime className="mt-5" showHours />
            <ButtonLink href="/contact?topic=transfer" className="mt-8">Report a transfer issue</ButtonLink>
          </div>
          <ol className="space-y-6 lg:col-span-7">
            {bp.howToRaise.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line-strong font-display text-sm font-bold">{i + 1}</span>
                <div>
                  <p className="font-display text-lg font-bold">{s.title}</p>
                  <p className="mt-1 text-fg-muted">{s.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <p className="mt-10 text-sm text-fg-subtle">Last updated {formatDate(bp.lastUpdated)}. These terms form part of our <Link href="/terms" className="underline underline-offset-4 hover:text-fg">terms of sale</Link>.</p>
      </Container>
    </>
  );
}
